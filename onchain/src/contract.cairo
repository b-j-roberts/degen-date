#[starknet::contract]
mod Clicker {
  use starknet::{ContractAddress, get_caller_address};
  use starknet::storage::{
    Map, StorageMapReadAccess, StorageMapWriteAccess, StoragePointerReadAccess, StoragePointerWriteAccess
  };
  use clicker::interface::IClicker;

  //
  // Storage
  //

  #[storage]
  struct Storage {
    // (clicker) -> clicks count
    clicks: Map<ContractAddress, felt252>,
    total_clicks: felt252
  }

  //
  // Constructor
  //

  #[constructor]
  fn constructor(ref self: ContractState) {}

  //
  // Clicker impl
  //

  #[abi(embed_v0)]
  impl ClickerImpl of IClicker<ContractState> {
    /// retrun the total clicks
    fn total_clicks(self: @ContractState) -> felt252 {
      self.total_clicks.read()
    }

    /// return the clicks of a specific clicker
    fn clicks_of(self: @ContractState, clicker: ContractAddress) -> felt252 {
      self.clicks.read(clicker)
    }

    /// increase the clicks of the caller and the total clicks
    fn click(ref self: ContractState) {
      let caller = get_caller_address();

      // increase caller clicker
      let clicks = self.clicks_of(clicker: caller);
      self.clicks.write(caller, clicks + 1);

      // increase total clicks
      let total_clicks = self.total_clicks();
      self.total_clicks.write(total_clicks + 1);
    }
  }
}
