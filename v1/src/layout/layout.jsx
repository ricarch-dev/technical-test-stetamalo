import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import VistaInfoPokemon from "../component/VistaInfoPokemon";
import { useState } from "react";
import { Icon } from "@iconify/react";
import VistaDetallesPokemon from "../component/VistaDetallesPokemon";
import { usePokemon } from "../context/PokemonContext";

const navigation = [
  {
    name: "info Pokemon",
    component: <VistaInfoPokemon />,
    current: true,
    id: 1,
  },
  {
    name: "Detalles Pokemon",
    component: <VistaDetallesPokemon />,
    current: false,
    id: 2,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout() {
  const setCurrentComponent = (viewId) => {
    setCurrentView(viewId);
  };
  const [currentView, setCurrentView] = useState(navigation[0].id);
  const { selectedPokemon, setSelectedPokemon } = usePokemon();

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="border-b border-gray-200 bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <div className="flex flex-shrink-0 items-center">
                      <Icon
                        icon="simple-icons:pokemon"
                        width="100"
                        height="100"
                      />
                    </div>
                    <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                      {navigation.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setCurrentComponent(item.id)}
                          className={classNames(
                            currentView === item.id
                              ? "border-red-500 text-gray-900"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                            "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                          )}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="-mr-2 flex items-center sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 pb-3 pt-2">
                  {navigation.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setCurrentComponent(item.id)}
                      className={classNames(
                        currentView === item.id
                          ? "border-red-500 text-gray-900"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                        "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <div className="py-10">
          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              {currentView === 1 ? (
                <VistaInfoPokemon />
              ) : currentView === 2 ? (
                <VistaDetallesPokemon selectedPokemon={selectedPokemon} />
              ) : null}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
