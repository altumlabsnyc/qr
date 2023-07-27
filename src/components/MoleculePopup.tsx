import { PredictedMolecule } from "@/types/DisplayTypes";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Link from "next/link";

interface Props {
  molecule: PredictedMolecule | null;
  setMoleculeShown: (molecule: PredictedMolecule | null) => void;
}

export default function MoleculePopup({ molecule, setMoleculeShown }: Props) {
  function closeModal() {
    setMoleculeShown(null);
  }

  return (
    <Transition appear show={molecule !== null} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="fixed top-0 left-0 h-full w-full overflow-hidden p-6 text-left align-middle transition-all bg-white">
                <div className="mt-4">
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full bg-blue-transparent flex items-center justify-center fixed top-4 left-4 border"
                    onClick={closeModal}
                  >
                    <ArrowBackRoundedIcon />
                  </button>
                </div>
                <br />
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900"
                >
                  {molecule?.common_name} :{" "}
                  {100 * (molecule?.concentration || 0)}%
                  {molecule?.name}
                </Dialog.Title>
                <Dialog.Description className="mt-2 font-bold">
                  {100 * molecule?.concentration}%
                </Dialog.Description>
                <p>
                  Wiki info goes here: a short paragraph of description. need to
                  be populated in the database (TODO)
                </p>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    d3.js graph of molecule data
                  </p>
                </div>
                <br />
                <center>
                  <Link
                    href={`https://en.wikipedia.org/wiki/${molecule?.name}`}
                    className="bg-transparent hover:bg-green-500 font-semibold hover:text-white py-3 px-10 border border-green-500 hover:border-transparent rounded-full"
                  >
                    Wikipedia
                  </Link>
                </center>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
