import React from 'react';
import './App.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Schéma de validation avec Yup pour définir les règles de validation du formulaire
const InvoiceSchema = Yup.object().shape({
  lastName: Yup.string().required('Le nom est obligatoire.'),
  firstName: Yup.string().required('Le prénom est obligatoire.'),
  legalStructureName: Yup.string().required('Le nom de la structure juridique est obligatoire.'),
  billingMonth: Yup.string().required('Le mois de facturation est obligatoire.'),
  billingDate: Yup.date().required('La date de facturation est obligatoire.'),
  amountExclTax: Yup.number().required('Le montant HT est obligatoire.').typeError('Vous devez entrer un nombre'),
  invoiceFile: Yup.mixed().required('Le fichier de la facture est obligatoire.'),
});

const App: React.FC = () => {
// Liste des mois pour le champ de sélection de mois de facturation
  const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  return (
    <div className="app">
      <Formik
        initialValues={{
          lastName: '',
          firstName: '',
          legalStructureName: '',
          billingMonth: '',
          billingDate: '',
          amountExclTax: 0,
          invoiceFile: undefined,
        }}
        validationSchema={InvoiceSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="formContainer">
            <h1 className="formTitle">Ajout facture</h1>

            <label htmlFor="lastName" className="label">Votre Nom*</label>
            <Field id="lastName" name="lastName" type="text" className="input" />
            <ErrorMessage name="lastName" component="div" className="errorMessage" />

            <label htmlFor="firstName" className="label">Votre Prénom*</label>
            <Field id="firstName" name="firstName" type="text" className="input" />
            <ErrorMessage name="firstName" component="div" className="errorMessage" />

            <label htmlFor="legalStructureName" className="label">Nom de votre structure juridique de Facturation*</label>
            <label htmlFor="legalMention1" className="mention">Le nom de votre entreprise, ou de l'entité commerciale qui facture vos prestations. <br/> Si vous facturez gràce à un status d'auto entrepreneur, c'est en votre nom. <br/> Si vous facturez via une SAS, SASU, SARL, EURL, ou autre société commerciale, c'est la dénomination que vous avez choisi lors de son immatriculation et que vous retrouverez sur le KBIS. <br/> En cas de partage salarial, c'est le nom de la société de partage qu'il faudra renseigner. </label>
            <Field id="legalStructureName" name="legalStructureName" type="text" className="input" />
            <ErrorMessage name="legalStructureName" component="div" className="errorMessage" />

            <label htmlFor="billingMonth" className="label">Mois de facturation*</label>
            <Field as="select" name="billingMonth" className="input">
              <option value="">Sélectionner un mois</option>
              {months.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </Field>
            <ErrorMessage name="billingMonth" component="div" className="errorMessage" />

            <label htmlFor="billingDate" className="label">Date de facturation*</label>
            <label htmlFor="legalMention1" className="mention">Attention, la date de la facture doit être postérieure à la dernière intervention de votre facture. L'échéance doit préciser le délai de paiement à 30 jours fin de mois. </label>
            <Field id="billingDate" name="billingDate" type="date" className="input" />
            <ErrorMessage name="billingDate" component="div" className="errorMessage" />

            <label htmlFor="amountExclTax" className="label">Montant HT*</label>
            <label htmlFor="legalMention1" className="mention">Merci d'entrer le montant HT de votre facture, sans € ou autre caractère </label>
            <Field id="amountExclTax" name="amountExclTax" type="number" min="0" className="input" />
            <ErrorMessage name="amountExclTax" component="div" className="errorMessage" />

            <label htmlFor="amountExclTax" className="label">Votre facture*</label>
            <label htmlFor="legalMention1" className="mention">Merci de n'uploader qu'une facture par soumission, au format PDF </label>
            <div className="file-upload-container">
            <label htmlFor="invoiceFile" className="file-upload-label">
              Cliquez pour télécharger des fichiers ou glissez-déposez des fichiers ici
              <Field id="invoiceFile" name="invoiceFile" type="file" className="file-upload-input" onChange={(event) => {
                setFieldValue("invoiceFile", event.currentTarget.files[0]);
              }} />
              <div className="plus-icon">+</div> {}
            </label>
          </div>
            <ErrorMessage name="invoiceFile" component="div" className="errorMessage" />

            <button type="submit" disabled={isSubmitting} className="submitButton">
              Soumettre
            </button>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
