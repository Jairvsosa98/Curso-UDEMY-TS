import { Fragment } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { useBudget } from '../hooks/useBudget'
import ExpenseForm from './ExpenseForm'

export default function ExpenseModal() {

    const { state, dispatch } = useBudget()

    return (
        <>
            <div className="fixed right-5 bottom-5 flex items-center justify-center">
                <button
                    type="button"
                    onClick={() => dispatch({ type: 'show-modal' })}
                >
                    <PlusCircleIcon className='w-16 h-16 text-blue-600 rounded-full cursor-pointer hover:text-blue-700 transition duration-300 ease-in-out' />
                </button>
            </div>

            <Transition appear show={state.modal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => { dispatch({ type: 'hide-modal' }) }}>
                    <TransitionChild>
                        <div className="fixed inset-0 bg-black opacity-75 transition delay-800 duration-300" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild>
                                <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                                    <ExpenseForm />

                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}