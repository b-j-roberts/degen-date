package routes

import (
	"encoding/json"
	"math/rand"
	"net/http"

	dbFunctions "github.com/b-j-roberts/degen-date/backend/internal/db"

	routeutils "github.com/b-j-roberts/degen-date/backend/routes/utils"
)

func getCoinById(w http.ResponseWriter, r *http.Request) {

	coinId := r.PathValue("id")

	coinBasics, error := dbFunctions.PostgresQueryOne[CoinBasicDetails]("SELECT * FROM coins WHERE id = $1", coinId)

	if error != nil {
		routeutils.WriteErrorJson(w, http.StatusInternalServerError, "Failed to get coin of id "+coinId)
		return
	}

	coinTradingDetails, error := dbFunctions.PostgresQueryOne[TradingDetails]("SELECT * FROM trading WHERE id = $1", coinId)

	if error != nil {
		routeutils.WriteErrorJson(w, http.StatusInternalServerError, "Failed to get coin of id "+coinId)
		return
	}

	coin := Coin{
		Address:   coinBasics.Address,
		Symbol:    coinBasics.Symbol,
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

	coins, error := dbFunctions.PostgresQueryJson[Coin]("SELECT address FROM coins")

	if error != nil {
		routeutils.WriteErrorJson(w, http.StatusInternalServerError, "Failed to get coin lineup")
		return
	}

	rand.Shuffle(len(coins), func(i, j int) {
		coins[i], coins[j] = coins[j], coins[i]
	})

	w.Write(coins)
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

func InitRoutes() {
	// Base route needed for health checks
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		routeutils.SetupHeaders(w)
		w.WriteHeader(http.StatusOK)
	})
	http.HandleFunc("/coin", addCoin)
	http.HandleFunc("/coin/{id}", getCoinById)
	http.HandleFunc("/lineup", getCoinLineup)
}
