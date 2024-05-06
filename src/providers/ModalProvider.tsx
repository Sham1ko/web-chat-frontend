import ContactsModal from "@/components/Modals/ContactsModal";
import ModalContext from "@/contexts/ModalContext";
import { ReactNode, useState } from "react";

type ModalProviderProps = {
  children: ReactNode;
};

export default function ModalProvider({ children }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ModalContext.Provider
      value={{
        isOpen: isOpen,
        openModal: () => {
          setIsOpen(true);
        },
        closeModal: () => {
          setIsOpen(false);
        },
      }}
    >
      <ContactsModal ModalOpen={isOpen} setModalOpen={setIsOpen} />
      {children}
    </ModalContext.Provider>
  );
}
