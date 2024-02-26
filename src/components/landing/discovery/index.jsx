import { Badge } from "primereact/badge";
import { StyleClass } from "primereact/styleclass";
import { useRef } from "react";

function Discovery() {
  let toggleMenuPhone = useRef(false);

  return (
    <div
      className="surface-overlay px-3 shadow-2 flex justify-content-between relative lg:static w-full"
      style={{minHeight: 84}}
    >
      <div className="flex align-items-center justify-content-center bg-surface">
        <img src="/jo-24.jpg" alt="Image" height="80" />
      </div>
      <StyleClass
        nodeRef={toggleMenuPhone}
        selector=".menuMobile"
        enterClassName="hidden"
        leaveToClassName="hidden"
        hideOnOutsideClick
      >
        <a className="cursor-pointer block lg:hidden align-self-center text-700 mt-1 p-ripple">
          <i className="pi pi-bars text-4xl"></i>
        </a>
      </StyleClass>
      <div className="lg:flex hidden absolute lg:static left-0 top-100 z-1 shadow-2 lg:shadow-none lg:pr-5 w-full lg:w-auto bg-surface menuMobile">
        <ul className="list-none p-0 m-0 flex select-none flex-column lg:flex-row border-top-1 border-gray-800 lg:border-top-none flex align-items-center">
          <li>
            <a
              href="/login"              
              className="h-6 gap-2 flex px-6 py-3 lg:px-3 no-underline align-items-center text-gray-500 hover:text-gray-600 hover:bg-surface font-medium cursor-pointer transition-all transition-duration-150 hover:shadow-2 border-round-2xl"
            >
              <span className="block font-medium">Se connecter</span>
              <i className="pi pi-sign-in text-base lg:text-2xl mr-2 lg:mr-0"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Discovery;
