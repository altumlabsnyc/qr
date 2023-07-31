import { Metadata, PredictedMolecule } from "@/types/DisplayTypes";
import { Dialog, Transition } from "@headlessui/react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import dynamic from "next/dynamic.js";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { concentrationDisplay } from "./StageDisplays/CompleteStageDisplay";

const MoleculeStructure = dynamic(
  () => import("@/components/MoleculeStructure"),
  { ssr: false }
);

interface Props {
  molecule: PredictedMolecule | null;
  setMoleculeShown: (molecule: PredictedMolecule | null) => void;
  metadata: Metadata;
}

export default function MoleculePopup({
  molecule,
  setMoleculeShown,
  metadata,
}: Props) {
  const [isDarkMode, setIsDarkMode] = useState(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const changeHandler = () => setIsDarkMode(mediaQuery.matches);

    mediaQuery.addEventListener("change", changeHandler);
    return () => mediaQuery.removeEventListener("change", changeHandler);
  }, []);

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
              <Dialog.Panel className="dark:bg-black fixed top-0 left-0 h-full w-full overflow-hidden p-6 text-left align-middle transition-all bg-white">
                <div className="mt-4">
                  <button
                    type="button"
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center fixed top-4 left-4 border"
                    onClick={closeModal}
                  >
                    <ArrowBackRoundedIcon />
                  </button>
                </div>
                <br />
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900 dark:text-white"
                >
                  {molecule?.name}
                </Dialog.Title>
                <Dialog.Description className="mt-1 mb-2 font-semibold text-sm dark:text-white">
                  {concentrationDisplay(molecule, metadata)}
                </Dialog.Description>
                <p className="text-gray-400">
                  {molecule?.molecule_wiki?.description ||
                    "Wiki information unavailable"}
                </p>
                <div className="flex flex-col items-center">
                  {molecule && (
                    <MoleculeStructure
                      width={256}
                      height={256}
                      id={uuidv4()}
                      structure={molecule.smiles}
                      svgMode={true}
                      isDarkMode={isDarkMode}
                    />
                  )}
                  <p className="text-sm text-red-500">
                    d3.js graph of molecule data
                  </p>
                </div>
                <br />
                <center>
                  <Link
                    href={`https://en.wikipedia.org/wiki/${molecule?.name}`}
                    className="bg-transparent hover:bg-green-500 transition-all duration-300 font-semibold hover:text-white py-3 px-10 border border-green-500 hover:border-transparent rounded-full dark:text-white"
                  >
                    <span className="mr-2">Wikipedia</span>
                    <ArrowForwardRoundedIcon sx={{ fontSize: 20 }} />
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
