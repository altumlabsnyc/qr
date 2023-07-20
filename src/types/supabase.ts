export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      analysis: {
        Row: {
          aerobic_bacteria: number | null
          aflatoxins: number | null
          aspergillus: boolean
          e_coli: boolean
          filth: number | null
          finished_at: string
          foreign_material: number | null
          id: string
          lab_order_id: string | null
          moisture_content: number | null
          ochratoxin_a: number | null
          regulator_approved: boolean
          salmonella: boolean
          started_at: string | null
          water_activity: number | null
          yeast_mold: number | null
        }
        Insert: {
          aerobic_bacteria?: number | null
          aflatoxins?: number | null
          aspergillus?: boolean
          e_coli?: boolean
          filth?: number | null
          finished_at?: string
          foreign_material?: number | null
          id?: string
          lab_order_id?: string | null
          moisture_content?: number | null
          ochratoxin_a?: number | null
          regulator_approved?: boolean
          salmonella?: boolean
          started_at?: string | null
          water_activity?: number | null
          yeast_mold?: number | null
        }
        Update: {
          aerobic_bacteria?: number | null
          aflatoxins?: number | null
          aspergillus?: boolean
          e_coli?: boolean
          filth?: number | null
          finished_at?: string
          foreign_material?: number | null
          id?: string
          lab_order_id?: string | null
          moisture_content?: number | null
          ochratoxin_a?: number | null
          regulator_approved?: boolean
          salmonella?: boolean
          started_at?: string | null
          water_activity?: number | null
          yeast_mold?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "analysis_lab_order_id_fkey"
            columns: ["lab_order_id"]
            referencedRelation: "lab_order"
            referencedColumns: ["id"]
          }
        ]
      }
      batch: {
        Row: {
          brand_id: string
          facility_id: string | null
          id: string
          weight: number | null
        }
        Insert: {
          brand_id: string
          facility_id?: string | null
          id?: string
          weight?: number | null
        }
        Update: {
          brand_id?: string
          facility_id?: string | null
          id?: string
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "batch_brand_id_fkey"
            columns: ["brand_id"]
            referencedRelation: "brand"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "batch_facility_id_fkey"
            columns: ["facility_id"]
            referencedRelation: "facility"
            referencedColumns: ["id"]
          }
        ]
      }
      brand: {
        Row: {
          id: string
          image_path: string | null
          name: string
          producer_user_id: string
          serving_size: number | null
        }
        Insert: {
          id?: string
          image_path?: string | null
          name: string
          producer_user_id: string
          serving_size?: number | null
        }
        Update: {
          id?: string
          image_path?: string | null
          name?: string
          producer_user_id?: string
          serving_size?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "brand_producer_user_id_fkey"
            columns: ["producer_user_id"]
            referencedRelation: "producer_user"
            referencedColumns: ["id"]
          }
        ]
      }
      co_molecule: {
        Row: {
          co_molecule_id: string
          molecule_id: string
        }
        Insert: {
          co_molecule_id: string
          molecule_id: string
        }
        Update: {
          co_molecule_id?: string
          molecule_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "co_molecule_co_molecule_id_fkey"
            columns: ["co_molecule_id"]
            referencedRelation: "molecule"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "co_molecule_molecule_id_fkey"
            columns: ["molecule_id"]
            referencedRelation: "molecule"
            referencedColumns: ["id"]
          }
        ]
      }
      consumer_user: {
        Row: {
          id: string
          personality: string | null
        }
        Insert: {
          id: string
          personality?: string | null
        }
        Update: {
          id?: string
          personality?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consumer_user_id_fkey"
            columns: ["id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      effect: {
        Row: {
          description: string | null
          id: string
          is_mental: boolean | null
        }
        Insert: {
          description?: string | null
          id?: string
          is_mental?: boolean | null
        }
        Update: {
          description?: string | null
          id?: string
          is_mental?: boolean | null
        }
        Relationships: []
      }
      facility: {
        Row: {
          description: string | null
          id: string
          location: string | null
          name: string
          producer_id: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          location?: string | null
          name: string
          producer_id?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          location?: string | null
          name?: string
          producer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "facility_producer_id_fkey"
            columns: ["producer_id"]
            referencedRelation: "producer_user"
            referencedColumns: ["id"]
          }
        ]
      }
      fragment: {
        Row: {
          id: string
          intensity: number | null
          mz_ratio: number | null
        }
        Insert: {
          id?: string
          intensity?: number | null
          mz_ratio?: number | null
        }
        Update: {
          id?: string
          intensity?: number | null
          mz_ratio?: number | null
        }
        Relationships: []
      }
      lab_order: {
        Row: {
          batch_id: string | null
          bio_id: string | null
          gcfid_id: string | null
          gcms_id: string | null
          hplc_id: string | null
          icpms_id: string | null
          id: string
          lab_notes: string | null
          lab_user_id: string | null
          lcms_id: string | null
          location: string | null
          pickup_date: string | null
          strain_info: string | null
        }
        Insert: {
          batch_id?: string | null
          bio_id?: string | null
          gcfid_id?: string | null
          gcms_id?: string | null
          hplc_id?: string | null
          icpms_id?: string | null
          id?: string
          lab_notes?: string | null
          lab_user_id?: string | null
          lcms_id?: string | null
          location?: string | null
          pickup_date?: string | null
          strain_info?: string | null
        }
        Update: {
          batch_id?: string | null
          bio_id?: string | null
          gcfid_id?: string | null
          gcms_id?: string | null
          hplc_id?: string | null
          icpms_id?: string | null
          id?: string
          lab_notes?: string | null
          lab_user_id?: string | null
          lcms_id?: string | null
          location?: string | null
          pickup_date?: string | null
          strain_info?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lab_order_batch_id_fkey"
            columns: ["batch_id"]
            referencedRelation: "batch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_order_lab_user_id_fkey"
            columns: ["lab_user_id"]
            referencedRelation: "lab_user"
            referencedColumns: ["id"]
          }
        ]
      }
      lab_user: {
        Row: {
          contact_phone: string | null
          id: string
          lab_address: string | null
          lab_name: string | null
          license_number: number | null
          owner_name: string | null
        }
        Insert: {
          contact_phone?: string | null
          id: string
          lab_address?: string | null
          lab_name?: string | null
          license_number?: number | null
          owner_name?: string | null
        }
        Update: {
          contact_phone?: string | null
          id?: string
          lab_address?: string | null
          lab_name?: string | null
          license_number?: number | null
          owner_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lab_user_id_fkey"
            columns: ["id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      molecule: {
        Row: {
          boiling_point: number | null
          chromatography_type:
            | Database["public"]["Enums"]["molecule_chromatography_type"]
            | null
          common_name: string | null
          id: string
          index: number | null
          "m/z": number | null
          melting_point: number | null
          molecular_weight: number | null
          molecule_wiki_id: string | null
          name: string | null
          retention_time: number | null
          smiles: string | null
          spec_energy: number | null
          spectrum: Database["public"]["Enums"]["molecule_spectrum"] | null
          standard_intensity: number | null
          type: Database["public"]["Enums"]["molecule_type"] | null
        }
        Insert: {
          boiling_point?: number | null
          chromatography_type?:
            | Database["public"]["Enums"]["molecule_chromatography_type"]
            | null
          common_name?: string | null
          id?: string
          index?: number | null
          "m/z"?: number | null
          melting_point?: number | null
          molecular_weight?: number | null
          molecule_wiki_id?: string | null
          name?: string | null
          retention_time?: number | null
          smiles?: string | null
          spec_energy?: number | null
          spectrum?: Database["public"]["Enums"]["molecule_spectrum"] | null
          standard_intensity?: number | null
          type?: Database["public"]["Enums"]["molecule_type"] | null
        }
        Update: {
          boiling_point?: number | null
          chromatography_type?:
            | Database["public"]["Enums"]["molecule_chromatography_type"]
            | null
          common_name?: string | null
          id?: string
          index?: number | null
          "m/z"?: number | null
          melting_point?: number | null
          molecular_weight?: number | null
          molecule_wiki_id?: string | null
          name?: string | null
          retention_time?: number | null
          smiles?: string | null
          spec_energy?: number | null
          spectrum?: Database["public"]["Enums"]["molecule_spectrum"] | null
          standard_intensity?: number | null
          type?: Database["public"]["Enums"]["molecule_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "molecule_molecule_wiki_id_fkey"
            columns: ["molecule_wiki_id"]
            referencedRelation: "molecule_wiki"
            referencedColumns: ["id"]
          }
        ]
      }
      molecule_on_effect: {
        Row: {
          effect_id: string
          moleclue_id: string
        }
        Insert: {
          effect_id: string
          moleclue_id: string
        }
        Update: {
          effect_id?: string
          moleclue_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "molecule_on_effect_effect_id_fkey"
            columns: ["effect_id"]
            referencedRelation: "effect"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "molecule_on_effect_moleclue_id_fkey"
            columns: ["moleclue_id"]
            referencedRelation: "molecule"
            referencedColumns: ["id"]
          }
        ]
      }
      molecule_prediction: {
        Row: {
          analysis_id: string | null
          concentration: number | null
          id: string
          molecule_id: string
          temperature: number | null
        }
        Insert: {
          analysis_id?: string | null
          concentration?: number | null
          id?: string
          molecule_id: string
          temperature?: number | null
        }
        Update: {
          analysis_id?: string | null
          concentration?: number | null
          id?: string
          molecule_id?: string
          temperature?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "molecule_prediction_analysis_id_fkey"
            columns: ["analysis_id"]
            referencedRelation: "analysis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "molecule_prediction_molecule_id_fkey"
            columns: ["molecule_id"]
            referencedRelation: "molecule"
            referencedColumns: ["id"]
          }
        ]
      }
      molecule_wiki: {
        Row: {
          id: string
          legal_limit: number | null
          state: string | null
        }
        Insert: {
          id?: string
          legal_limit?: number | null
          state?: string | null
        }
        Update: {
          id?: string
          legal_limit?: number | null
          state?: string | null
        }
        Relationships: []
      }
      plant: {
        Row: {
          genetics: string | null
          id: string
          plant_variety_id: string
        }
        Insert: {
          genetics?: string | null
          id?: string
          plant_variety_id: string
        }
        Update: {
          genetics?: string | null
          id?: string
          plant_variety_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "plant_plant_variety_id_fkey"
            columns: ["plant_variety_id"]
            referencedRelation: "plant_variety"
            referencedColumns: ["id"]
          }
        ]
      }
      plant_grow_info: {
        Row: {
          fertilization_regiment: string | null
          id: string
          is_natural: boolean | null
          lighting: string | null
          PAR: number | null
          soil_composition: string | null
          "water/hr": number | null
        }
        Insert: {
          fertilization_regiment?: string | null
          id?: string
          is_natural?: boolean | null
          lighting?: string | null
          PAR?: number | null
          soil_composition?: string | null
          "water/hr"?: number | null
        }
        Update: {
          fertilization_regiment?: string | null
          id?: string
          is_natural?: boolean | null
          lighting?: string | null
          PAR?: number | null
          soil_composition?: string | null
          "water/hr"?: number | null
        }
        Relationships: []
      }
      plant_season: {
        Row: {
          end: string | null
          id: string
          plant_grow_info_id: string | null
          plant_id: string
          start: string | null
        }
        Insert: {
          end?: string | null
          id?: string
          plant_grow_info_id?: string | null
          plant_id: string
          start?: string | null
        }
        Update: {
          end?: string | null
          id?: string
          plant_grow_info_id?: string | null
          plant_id?: string
          start?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "plant_season_plant_grow_info_id_fkey"
            columns: ["plant_grow_info_id"]
            referencedRelation: "plant_grow_info"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plant_season_plant_id_fkey"
            columns: ["plant_id"]
            referencedRelation: "plant"
            referencedColumns: ["id"]
          }
        ]
      }
      plant_season_on_batch: {
        Row: {
          batch_id: string
          plant_season_id: string
        }
        Insert: {
          batch_id: string
          plant_season_id: string
        }
        Update: {
          batch_id?: string
          plant_season_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "plant_season_on_batch_batch_id_fkey"
            columns: ["batch_id"]
            referencedRelation: "batch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plant_season_on_batch_plant_season_id_fkey"
            columns: ["plant_season_id"]
            referencedRelation: "plant_season"
            referencedColumns: ["id"]
          }
        ]
      }
      plant_variety: {
        Row: {
          genus: string | null
          id: string
          species: string | null
          strain: string | null
        }
        Insert: {
          genus?: string | null
          id?: string
          species?: string | null
          strain?: string | null
        }
        Update: {
          genus?: string | null
          id?: string
          species?: string | null
          strain?: string | null
        }
        Relationships: []
      }
      predmol_on_fragment: {
        Row: {
          fragment_id: string | null
          id: string
          predmol_id: string | null
        }
        Insert: {
          fragment_id?: string | null
          id?: string
          predmol_id?: string | null
        }
        Update: {
          fragment_id?: string | null
          id?: string
          predmol_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "predmol_on_fragment_fragment_id_fkey"
            columns: ["fragment_id"]
            referencedRelation: "fragment"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "predmol_on_fragment_predmol_id_fkey"
            columns: ["predmol_id"]
            referencedRelation: "molecule_prediction"
            referencedColumns: ["id"]
          }
        ]
      }
      producer_prefill: {
        Row: {
          business_name: string | null
          city: string | null
          contact_phone: string | null
          county: string | null
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          license_number: string | null
          license_type: Database["public"]["Enums"]["license_type_enum"] | null
          website: string | null
        }
        Insert: {
          business_name?: string | null
          city?: string | null
          contact_phone?: string | null
          county?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          license_number?: string | null
          license_type?: Database["public"]["Enums"]["license_type_enum"] | null
          website?: string | null
        }
        Update: {
          business_name?: string | null
          city?: string | null
          contact_phone?: string | null
          county?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          license_number?: string | null
          license_type?: Database["public"]["Enums"]["license_type_enum"] | null
          website?: string | null
        }
        Relationships: []
      }
      producer_user: {
        Row: {
          billing_address: string | null
          common_name: string | null
          contact_phone: string | null
          id: string
          legal_name: string | null
          license_number: string | null
          license_type: Database["public"]["Enums"]["license_type_enum"] | null
          primary_facility_address: string | null
        }
        Insert: {
          billing_address?: string | null
          common_name?: string | null
          contact_phone?: string | null
          id: string
          legal_name?: string | null
          license_number?: string | null
          license_type?: Database["public"]["Enums"]["license_type_enum"] | null
          primary_facility_address?: string | null
        }
        Update: {
          billing_address?: string | null
          common_name?: string | null
          contact_phone?: string | null
          id?: string
          legal_name?: string | null
          license_number?: string | null
          license_type?: Database["public"]["Enums"]["license_type_enum"] | null
          primary_facility_address?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "producer_user_id_fkey"
            columns: ["id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      regulator_user: {
        Row: {
          contact_phone: string | null
          id: string
          mailing_address: string | null
          regulator_name: string | null
        }
        Insert: {
          contact_phone?: string | null
          id: string
          mailing_address?: string | null
          regulator_name?: string | null
        }
        Update: {
          contact_phone?: string | null
          id?: string
          mailing_address?: string | null
          regulator_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "regulator_user_id_fkey"
            columns: ["id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      university_user: {
        Row: {
          id: string
          lab_address: string | null
          primary_investigator: string | null
          university_department: string | null
          university_name: string | null
        }
        Insert: {
          id: string
          lab_address?: string | null
          primary_investigator?: string | null
          university_department?: string | null
          university_name?: string | null
        }
        Update: {
          id?: string
          lab_address?: string | null
          primary_investigator?: string | null
          university_department?: string | null
          university_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "university_user_id_fkey"
            columns: ["id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      user: {
        Row: {
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          mfa_phone: string | null
          user_type: Database["public"]["Enums"]["user_type_enum"] | null
        }
        Insert: {
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          mfa_phone?: string | null
          user_type?: Database["public"]["Enums"]["user_type_enum"] | null
        }
        Update: {
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          mfa_phone?: string | null
          user_type?: Database["public"]["Enums"]["user_type_enum"] | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      license_type_enum: "AUCC" | "AUCP" | "AUHC"
      molecule_chromatography_type:
        | "LC-MS/MS"
        | "UPLC"
        | "HPLC"
        | "LC-MS,1"
        | "LC-MS,2"
      molecule_spectrum:
        | "GC-MS"
        | "LC-MS/MS"
        | "Cayman MS"
        | "GC-MS,1"
        | "GC-MS,2"
        | "GC-MS,3"
        | "MS-MS,1"
        | "MS-MS,2"
        | "LC-MS,1"
        | "LC-MS,2"
      molecule_type:
        | "Cannabinoids"
        | "Terpenes"
        | "Flavinoids"
        | "Phenols"
        | "Pesticides"
        | "Solvents"
        | "Metals"
        | "Others"
      user_type_enum:
        | "consumer"
        | "regulator"
        | "lab"
        | "producer"
        | "university"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
