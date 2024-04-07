import '@testing-library/jest-dom';
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';


test('renders the form', () => {
  const { getByText } = render(<App />);

  
  expect(getByText(/ajout facture/i)).toBeInTheDocument();

 
  expect(getByText(/Votre Nom\*/i)).toBeInTheDocument();
  expect(getByText(/Votre Prénom\*/i)).toBeInTheDocument();
  expect(getByText(/Nom de votre structure juridique de Facturation\*/i)).toBeInTheDocument();
  expect(getByText(/Mois de facturation\*/i)).toBeInTheDocument();
  expect(getByText(/Date de facturation\*/i)).toBeInTheDocument();
  expect(getByText(/Montant HT\*/i)).toBeInTheDocument();
  
});


test('submits the form', async () => {
  const { getByText, getByLabelText } = render(<App />);

  
  fireEvent.change(getByLabelText(/Votre Nom\*/i), { target: { value: 'Doe' } });
  fireEvent.change(getByLabelText(/Votre Prénom\*/i), { target: { value: 'John' } });
  

  
  fireEvent.click(getByText(/soumettre/i));

  
});


test('validates the form fields', async () => {
  const { getByText } = render(<App />);

  
  fireEvent.click(getByText(/soumettre/i));

  
});
