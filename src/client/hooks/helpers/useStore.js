import React from 'react';

export const AppStateContext = React.createContext();

export const AppStateProvider = ({ children }) => {
  const [store, setStore] = React.useState({
    user: '',
    token: '',
    config: {
      phone: '09046393569',
      whatsapp: '07066922784',
      social: '#',
      whatsapp_group: 'https://chat.whatsapp.com/DptEtCDg0xpGeuCndxkD04',
    },
    bundles: [],
    isLoading: true,
    balances: undefined,
    isAuthenticated: false,
    accounts: {
      data: [],
      error: '',
      isGettingAccount: false,
    },
  });

  return (
    <AppStateContext.Provider value={[store, setStore]}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useStore = () => {
  const [store, setStore] = React.useContext(AppStateContext);

  return {
    store,
    setStore,
  };
};
