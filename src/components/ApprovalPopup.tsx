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
): [TestResult, TestRequirement][] {
  if (!result || !requirement) {
    return [];
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
                  className="text-lg font-bold leading-6 text-gray-900 dark:text-white"
                >
                  Regulator:{" "}
                  {metadataShown?.regulator?.regulator_name ||
                    "Regulator name not available"}
                </Dialog.Title>
                <Dialog.Description className="mt-1 mb-2 font-semibold text-sm dark:text-white">
                  Review notes:{" "}
                  {metadataShown?.review?.notes || "No notes available"}
                </Dialog.Description>
                <div className="text-gray-400">
                  Test results:
                  {setupResults(
                    metadataShown?.results,
                    metadataShown?.requirements
                  )?.map((entry) => (
                    <div className="grid grid-rows-4 grid-cols-2 grid-flow-col text-sm">
                      <div>Result: </div>
                      <div>Test requirement name: </div>
                      <div>Requirement description: </div>
                      <div>Requirement location: </div>
                      <div>{entry[0].result}</div>
                      <div>{entry[1].name}</div>
                      <div>{entry[1].description}</div>
                      <div>
                        {entry[1].state_code}, {entry[1].country_code}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center">another thing</div>
                <br />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
