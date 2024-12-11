package main

import (
	"fmt"
	"net/http"

	"github.com/b-j-roberts/degen-date/backend/internal/config"
	"github.com/b-j-roberts/degen-date/backend/internal/db"
	"github.com/b-j-roberts/degen-date/backend/routes"
)

func main() {
	config.InitConfig()

	db.InitDB()
	defer db.CloseDB()

	routes.InitRoutes()
	fmt.Println("Listening on port:", config.Conf.Api.Port)
	http.ListenAndServe(fmt.Sprintf(":%d", config.Conf.Api.Port), nil)
	fmt.Println("Server stopped")
}
