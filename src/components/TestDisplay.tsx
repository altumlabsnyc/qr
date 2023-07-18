import React from "react";

interface ProducerInfo {
  legal_name: string;
  common_name: string;
  primary_facility_address: string;
  billing_address: string;
  license_type: string;
  license_number: string;
  contact_phone: string;
}

interface LabOrderInfo {
  strain_info: string;
  location: string;
  pickup_date: string;
}

interface MoleculeInfo {
  temperature: number;
  concentration: number;
  name: string;
  common_name: string;
  molecular_weight: number;
  spec_energy: number;
  m_z: number;
  standard_intensity: number;
  retention_time: number;
  melting_point: number;
  boiling_point: number;
  smiles: string;
  chromatography_type: string;
  molecule_type: string;
  spectrum: string;
}

interface Props {
  producerInfo: ProducerInfo;
  brandName: string;
  labOrderInfo: LabOrderInfo;
  moleculeInfo: MoleculeInfo;
}

const UIComponent: React.FC<Props> = ({
  producerInfo,
  brandName,
  labOrderInfo,
  moleculeInfo,
}) => {
  return (
    <div>
      <h2>Producer Info</h2>
      <p>Legal Name: {producerInfo.legal_name}</p>
      <p>Common Name: {producerInfo.common_name}</p>
      <p>Primary Facility Address: {producerInfo.primary_facility_address}</p>
      <p>Billing Address: {producerInfo.billing_address}</p>
      <p>License Type: {producerInfo.license_type}</p>
      <p>License Number: {producerInfo.license_number}</p>
      <p>Contact Phone: {producerInfo.contact_phone}</p>

      <h2>Brand Name</h2>
      <p>{brandName}</p>

      <h2>Lab Order Info</h2>
      <p>Strain Info: {labOrderInfo.strain_info}</p>
      <p>Location: {labOrderInfo.location}</p>
      <p>Pickup Date: {labOrderInfo.pickup_date}</p>

      <h2>Molecule Info</h2>
      <p>Temperature: {moleculeInfo.temperature}</p>
      <p>Concentration: {moleculeInfo.concentration}</p>
      <p>Name: {moleculeInfo.name}</p>
      <p>Common Name: {moleculeInfo.common_name}</p>
      <p>Molecular Weight: {moleculeInfo.molecular_weight}</p>
      <p>Spec Energy: {moleculeInfo.spec_energy}</p>
      <p>m/z: {moleculeInfo.m_z}</p>
      <p>Standard Intensity: {moleculeInfo.standard_intensity}</p>
      <p>Retention Time: {moleculeInfo.retention_time}</p>
      <p>Melting Point: {moleculeInfo.melting_point}</p>
      <p>Boiling Point: {moleculeInfo.boiling_point}</p>
      <p>SMILES: {moleculeInfo.smiles}</p>
      <p>Chromatography Type: {moleculeInfo.chromatography_type}</p>
      <p>Molecule Type: {moleculeInfo.molecule_type}</p>
      <p>Spectrum: {moleculeInfo.spectrum}</p>
    </div>
  );
};

export default UIComponent;
