# Degen Date

## Backend

### Routes

`/coin/{id}`

- returns details of a coin listed by id

`/lineup`

uses a probabilistic sorting algorithm to generate a list of coins to be displayed by the user.

the algorithm takes into account the following properties:

1. bribe from external sources (defaults to 0)
2. 12h volume of coin representing the coins activity

#### params

`exceptionList` (optional) - list of tokens not to return sent by user.

- returns a list of coin id's (token contract address?) to be displayed by the user

### Types

`Coin`
Holds the coin details for a memecoin:

```go
type Coin struct {
	address   string  `json:"address"`
    symbol    string  `json:"symbol"`
	name      string  `json:"name"`
	decimals  int     `json:"decimals"`
	imageURL  string  `json:"imageURL"`
	volume    float64 `json:"volume"`
	holders   int     `json:"holders"`
	marketCap float64 `json:"marketCap"`
	price     float64 `json:"price"`
}

type TradingDetails struct {
	address   string  `json:"address"`
	volume    float64 `json:"volume"`
	holders   int     `json:"holders"`
	marketCap float64 `json:"marketCap"`
	price     float64 `json:"price"`
}

type CoinBasicDetails struct {
	address  string `json:"address"`
	symbol   string `json:"symbol"`
	name     string `json:"name"`
	decimals int    `json:"decimals"`
	imageURL string `json:"imageURL"`
}


```
