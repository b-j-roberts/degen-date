package routes

import (
	"encoding/json"
	"fmt"
	"image"
	"image/png"
	"math/rand"
	"net/http"
	"os"

	dbFunctions "github.com/b-j-roberts/degen-date/backend/internal/db"

	routeutils "github.com/b-j-roberts/degen-date/backend/routes/utils"
)

func getCoinById(w http.ResponseWriter, r *http.Request) {

	coinId := r.PathValue("id")

	coinBasics, error := dbFunctions.PostgresQueryOne[CoinBasicDetails]("SELECT * FROM public.coins WHERE id = $1", coinId)

	if error != nil {
		routeutils.WriteErrorJson(w, http.StatusInternalServerError, "Failed to get coin of id "+coinId)
		return
	}

	coinTradingDetails, error := dbFunctions.PostgresQueryOne[TradingDetails]("SELECT * FROM public.trading WHERE id = $1", coinId)

	if error != nil {
		routeutils.WriteErrorJson(w, http.StatusInternalServerError, "Failed to get coin of id "+coinId)
		return
	}

	coin := Coin{
		Address:   coinBasics.Address,
		Ticker:    coinBasics.Ticker,
		Name:      coinBasics.Name,
		Decimals:  coinBasics.Decimals,
		ImageUrl:  coinBasics.ImageUrl,
		Volume:    coinTradingDetails.Volume,
		Holders:   coinTradingDetails.Holders,
		MarketCap: coinTradingDetails.MarketCap,
		Price:     coinTradingDetails.Price,
	}

	resp, error := json.Marshal(coin)
	if error != nil {
		routeutils.WriteErrorJson(w, http.StatusInternalServerError, "Failed to get coin of id "+coinId)
		return
	}
	w.Write(resp)
}

func getCoinLineup(w http.ResponseWriter, r *http.Request) {
	routeutils.SetupHeaders(w)

	coins, error := dbFunctions.PostgresQuery[CoinBasicDetails]("SELECT * FROM coins")
	println(coins)
	println(error)
	if error != nil {
		routeutils.WriteErrorJson(w, http.StatusInternalServerError, "Failed to get coin lineup")
		return
	}

	rand.Shuffle(len(coins), func(i, j int) {
		coins[i], coins[j] = coins[j], coins[i]
	})

	resp, err := json.Marshal(coins)
	if err != nil {
		routeutils.WriteErrorJson(w, http.StatusInternalServerError, "Failed to get coin lineup")
		return
	}
	w.Write(resp)
}

func addCoin(w http.ResponseWriter, r *http.Request) {
	routeutils.SetupHeaders(w)
	newCoin, err := routeutils.ReadJsonBody[newCoinRequest](r)

	if err != nil {
		routeutils.WriteErrorJson(w, http.StatusBadRequest, "Failed to add new coin")
		return
	}

	_, err = dbFunctions.PostgresQueryJson[CoinBasicDetails]("INSERT INTO coins (tx_hash, address, ticker, name, decimals, image_url) VALUES ($1, $2, $3, $4, $5)", newCoin.TxHash, newCoin.Ticker, "", 0, newCoin.ImageUrl)

	if err != nil {
		routeutils.WriteErrorJson(w, http.StatusInternalServerError, "Failed to add new coin")
		return
	}
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
	http.HandleFunc("/coin", addCoin)
	http.HandleFunc("/coin/{id}", getCoinById)
	http.HandleFunc("/lineup", getCoinLineup)
  http.HandleFunc("/upload-memecoin-image", uploadMemecoinImage)
  http.Handle("/memecoins/", http.StripPrefix("/memecoins/", http.FileServer(http.Dir("./memecoins"))))
}
