import { Metadata, TestRequirement, TestResult } from "@/types/DisplayTypes";
import { Dialog, Transition } from "@headlessui/react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Fragment } from "react";

interface Props {
  metadataShown: Metadata | null;
  setMetadataShown: (metadata: Metadata | null) => void;
}

function setupResults(
  result: TestResult[] | null | undefined,
  requirement: TestRequirement[] | null | undefined
): [TestResult, TestRequirement][] | null {
  if (!result || !requirement) {
    return null;
  }
  return result.map((result, index) => [result, requirement[index]]);
}

export default function ApprovalPopup({
  metadataShown,
  setMetadataShown,
}: Props) {
  function closeModal() {
    setMetadataShown(null);
  }

  console.log(metadataShown?.requirements);

  return (
    <Transition appear show={metadataShown !== null} as={Fragment}>
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
                  className="text-2xl font-bold leading-6 text-gray-900 dark:text-white mt-2"
                >
                  {metadataShown?.regulator?.regulator_name ||
                    "Regulator name not available"}
                </Dialog.Title>
                <Dialog.Description className="mt-2 font-semibold text-sm dark:text-white">
                  <p className="mb-2">
                    Review notes:{" "}
                    {metadataShown?.review?.notes || "No notes available"}
                  </p>
                  <p className="mb-2 dark:text-white font-bold text-sm">
                    Location:{" "}
                    {metadataShown?.requirements &&
                    metadataShown.requirements[0]
                      ? metadataShown.requirements[0].state_code +
                        ", " +
                        metadataShown.requirements[0].country_code
                      : "No location available"}
                  </p>
                </Dialog.Description>

                <h2 className="dark:text-white font-bold pb-2 pt-3 text-xl">
                  Tests
                </h2>
                {setupResults(
                  metadataShown?.results,
                  metadataShown?.requirements
                )?.map((entry) => (
                  <div className="border border-transparent bg-gray-100 dark:bg-zinc-800 rounded-3xl p-4 my-2 shadow-md">
                    <div className="grid grid-rows-3 grid-cols-3 grid-flow-col gap-x-30 gap-y-2 text-sm dark:text-white">
                      <div className="font-semibold text-left">Test name</div>
                      <div className="font-semibold text-left">Description</div>
                      <div className="font-semibold text-left">Result</div>
                      <div className="dark:text-zinc-400 text-right col-span-2">
                        {entry[1].name}
                      </div>
                      <div className="dark:text-zinc-400 text-right col-span-2">
                        {entry[1].description}
                      </div>
                      <div className="dark:text-zinc-400 text-right col-span-2">
                        {entry[0].result}
                      </div>
                    </div>
                  </div>
                ))}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
