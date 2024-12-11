package main

import (
	"fmt"
	"net/http"

	"github.com/b-j-roberts/degen-date/backend/internal/config"
	"github.com/b-j-roberts/degen-date/backend/internal/db"
	"github.com/b-j-roberts/degen-date/backend/routes"
	"github.com/b-j-roberts/degen-date/backend/routes/indexer"
)

func main() {
	config.InitConfig()

	db.InitDB()
	defer db.CloseDB()

	routes.InitRoutes()
	indexer.InitIndexerRoutes()
	indexer.StartMessageProcessor()

	fmt.Println("Listening on port:", config.Conf.Consumer.Port)
	err := http.ListenAndServe(fmt.Sprintf(":%d", config.Conf.Consumer.Port), nil)
	if err != nil {
		fmt.Println("Error lisn and serve")
	}
	fmt.Println("Server stopped")
}
