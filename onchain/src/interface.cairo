use starknet::ContractAddress;

#[starknet::interface]
pub trait IClicker<TState> {
    fn total_clicks(self: @TState) -> felt252;
    fn clicks_of(self: @TState, clicker: ContractAddress) -> felt252;

    fn click(ref self: TState);
}
