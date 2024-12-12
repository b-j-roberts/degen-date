package routes

import (
	"fmt"
	"net/http"

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

func InitRoutes() {
	// Base route needed for health checks
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		routeutils.SetupHeaders(w)
		w.WriteHeader(http.StatusOK)
	})
	http.HandleFunc("/get_memecoins", getMemeCoins)
}
