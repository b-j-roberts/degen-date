package routes

type Coin struct {
	Address   string  `json:"address"`
	Ticker    string  `json:"ticker"`
	Name      string  `json:"name"`
	Decimals  int     `json:"decimals"`
	ImageUrl  string  `json:"imageUrl"`
	Volume    float64 `json:"volume"`
	Holders   int     `json:"holders"`
	MarketCap float64 `json:"marketCap"`
	Price     float64 `json:"price"`
}

type TradingDetails struct {
	Address   string  `json:"address"`
	Volume    float64 `json:"volume"`
	Holders   int     `json:"holders"`
	MarketCap float64 `json:"marketCap"`
	Price     float64 `json:"price"`
}

type CoinBasicDetails struct {
	Address  string `json:"address"`
	Ticker   string `json:"ticker"`
	Name     string `json:"name"`
	Decimals int    `json:"decimals"`
	ImageUrl string `json:"imageUrl"`
}

type newCoinRequest struct {
	TxHash   string `json:"txHash"`
	ImageUrl string `json:"imageUrl"`
	Ticker   string `json:"ticker"`
}
