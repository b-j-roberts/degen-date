package indexer

func processNewTokenEvent(event IndexerEvent) {
	txId := event.Event.Data[0]
	tokenAddress := event.Data[1]
	tokenTicker := event.Data[2]
	tokenName := event.Data[3]
	tokenDecimals := event.Data[4]
	tokenSupply := event.Data[5]

	coinTradingDetails := TradingDetails{
		Address:   tokenAddress,
		Volume:    0,
		Holders:   0,
		MarketCap: 0,
		Price:     0,
	}

	coinBasics := CoinBasicDetails{
		Address:  tokenAddress,
		Symbol:   tokenTicker,
		Name:     tokenName,
		Decimals: tokenDecimals,
	}

}
