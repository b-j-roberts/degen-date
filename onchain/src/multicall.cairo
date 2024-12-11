use starknet::account::Call;
use starknet::syscalls::call_contract_syscall;

fn execute_multicall(mut calls: Span<Call>) -> Array<Span<felt252>> {
    let mut result: Array<Span<felt252>> = ArrayTrait::new();
    let mut idx = 0;
    loop {
        match calls.pop_front() {
            Option::Some(call) => {
                match call_contract_syscall(*call.to, *call.selector, *call.calldata) {
                    Result::Ok(retdata) => {
                        result.append(retdata);
                        idx = idx + 1;
                    },
                    Result::Err(revert_reason) => {
                        let mut data = ArrayTrait::new();
                        data.append('argent/multicall-failed');
                        data.append(idx);
                        data.append_all(revert_reason);
                        panic(data);
                    },
                }
            },
            Option::None(_) => {
                break;
            },
        };
    };
    result
}

trait ArrayExtTrait<T> {
    fn append_all(ref self: Array<T>, value: Array<T>);
}

impl ArrayExtImpl<T, impl TDrop: Drop<T>> of ArrayExtTrait<T> {
    fn append_all(ref self: Array<T>, mut value: Array<T>) {
        loop {
            match value.pop_front() {
                Option::Some(item) => {
                    self.append(item);
                },
                Option::None(()) => {
                    break;
                },
            };
        };
    }
}

//
// Contract
//

#[starknet::interface]
trait IMulticall<TContractState> {
    fn aggregate(self: @TContractState, calls: Array<Call>) -> (u64, Array<Span<felt252>>);
}

#[starknet::contract]
mod Multicall {
    use starknet::{get_block_number, account::Call};

    use super::execute_multicall;

    #[storage]
    struct Storage {}

    #[abi(embed_v0)]
    impl MulticallImpl of super::IMulticall<ContractState> {
        fn aggregate(self: @ContractState, calls: Array<Call>) -> (u64, Array<Span<felt252>>) {
            (get_block_number(), execute_multicall(calls.span()))
        }
    }
}
