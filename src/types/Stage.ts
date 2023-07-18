// enum created based on what data in database (not acutal enum in database)
export enum STAGE {
  LAB, // analysis is null
  ANALYSIS, // analysis not null, but no predicted molecules
  COMPLETE, // predicted molecules
}
