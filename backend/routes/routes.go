package routes

import (
	"fmt"
	"image"
	"image/png"
	"net/http"
	"os"

	dbFunctions "github.com/b-j-roberts/degen-date/backend/internal/db"

	routeutils "github.com/b-j-roberts/degen-date/backend/routes/utils"
)

func getMemeCoins(w http.ResponseWriter, r *http.Request) {
	coins, error := dbFunctions.PostgresQueryJson[MemeCoin]("SELECT * FROM public.MemeCoins WHERE launched = TRUE")
	if error != nil {
		fmt.Println(error)
		routeutils.WriteErrorJson(w, http.StatusInternalServerError, "Failed to get memecoins")
		return
	}

	routeutils.WriteDataJson(w, string(coins))
}

func uploadMemecoinImage(w http.ResponseWriter, r *http.Request) {
  file, _, err := r.FormFile("image")
  if err != nil {
    routeutils.WriteErrorJson(w, http.StatusBadRequest, "Failed to read image")
    return
  }
  defer file.Close()

  r.ParseForm()
  contractAddress := r.FormValue("contractAddress")

  img, _, err := image.Decode(file)
  if err != nil {
    routeutils.WriteErrorJson(w, http.StatusBadRequest, "Failed to decode image")
    return
  }

  if _, err := os.Stat("memecoins"); os.IsNotExist(err) {
    err = os.Mkdir("memecoins", os.ModePerm)
    if err != nil {
      routeutils.WriteErrorJson(w, http.StatusInternalServerError, "Failed to create stencils directory")
      return
    }
  }

  filename := fmt.Sprintf("memecoins/%s.png", contractAddress)
  newimg, err := os.Create(filename)
  if err != nil {
    routeutils.WriteErrorJson(w, http.StatusInternalServerError, "Failed to create file")
    return
  }
  defer newimg.Close()

  err = png.Encode(newimg, img)
  if err != nil {
    routeutils.WriteErrorJson(w, http.StatusInternalServerError, "Failed to encode image")
    return
  }

  routeutils.WriteResultJson(w, "Image uploaded successfully")
}

func InitRoutes() {
	// Base route needed for health checks
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		routeutils.SetupHeaders(w)
		w.WriteHeader(http.StatusOK)
	})
  http.HandleFunc("/upload-memecoin-image", uploadMemecoinImage)
  http.Handle("/memecoins/", http.StripPrefix("/memecoins/", http.FileServer(http.Dir("./memecoins"))))
	http.HandleFunc("/get_memecoins", getMemeCoins)
}
