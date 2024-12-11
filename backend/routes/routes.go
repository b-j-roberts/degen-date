package routes

import (
	"net/http"

	dbFunctions "github.com/b-j-roberts/degen-date/backend/internal/db"

	routeutils "github.com/b-j-roberts/degen-date/backend/routes/utils"
)

func getCoinById(w http.ResponseWriter, r *http.Request) {

	coinId := r.PathValue("id")

	coin, error := dbFunctions.PostgresQueryOneJson[Coin]("SELECT * FROM coins WHERE id = $1", coinId)

	if error != nil {
		routeutils.WriteErrorJson(w, http.StatusInternalServerError, "Failed to get coin of id "+coinId)
	}

	w.Write(coin)
}

func getCoinLineup(w http.ResponseWriter, r *http.Request) {
	routeutils.SetupHeaders(w)

	coins, error := dbFunctions.PostgresQueryJson[Coin]("SELECT address FROM coins")

	if error != nil {
		routeutils.WriteErrorJson(w, http.StatusInternalServerError, "Failed to get coin lineup")
		return
	}

	w.Write(coins)
}

func InitRoutes() {
	// Base route needed for health checks
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		routeutils.SetupHeaders(w)
		w.WriteHeader(http.StatusOK)
	})
	http.HandleFunc("/coin/{id}", getCoinById)
	http.HandleFunc("/lineup", getCoinLineup)
}
