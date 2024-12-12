package routes

type MemeCoin struct {
	Owner        string `json:"owner"`
	Name         string `json:"name"`
	Symbol       string `json:"symbol"`
	Supply       string `json:"supply"`
	Address      string `json:"address"`
	Launched     bool   `json:"launched"`
	QuoteToken   string `json:"quote_token"`
	ExchangeName string `json:"exchange_name"`
}
