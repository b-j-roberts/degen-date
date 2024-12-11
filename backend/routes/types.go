package routes

type Coin struct {
	address   string  `json:"address"`
	symbol    string  `json:"symbol"`
	name      string  `json:"name"`
	decimals  int     `json:"decimals"`
	volume    int     `json:"volume"`
	price     float64 `json:"price"`
	marketCap float64 `json:"marketCap"`
}
