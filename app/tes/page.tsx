"use client"

import { useMenuModal } from '../hooks/useMenuModal';

const App = () => {
  const menuModal = useMenuModal();

  console.log(menuModal.isOpen)
  return (
    <div>
      <button onClick={menuModal.onOpen}>Open Modal</button>
    </div>
  );
};

export default App;
