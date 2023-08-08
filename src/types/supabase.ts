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
      address: {
        Row: {
          city: string
          country_code: string
          id: string
          line_1: string
          line_2: string | null
          postal_code: string
          state_code: string
        }
        Insert: {
          city: string
          country_code: string
          id?: string
          line_1: string
          line_2?: string | null
          postal_code: string
          state_code: string
        }
        Update: {
          city?: string
          country_code?: string
          id?: string
          line_1?: string
          line_2?: string | null
          postal_code?: string
          state_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_address_state"
            columns: ["state_code", "country_code"]
            referencedRelation: "state"
            referencedColumns: ["state_code", "country_code"]
          }
        ]
      }
      analysis: {
        Row: {
          finished_at: string
          id: string
          regulator_review_id: string | null
          started_at: string | null
        }
        Insert: {
          finished_at?: string
          id?: string
          regulator_review_id?: string | null
          started_at?: string | null
        }
        Update: {
          finished_at?: string
          id?: string
          regulator_review_id?: string | null
          started_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analysis_regulator_review_id_fkey"
            columns: ["regulator_review_id"]
            referencedRelation: "regulator_review"
            referencedColumns: ["id"]
          }
        ]
      }
      batch: {
        Row: {
          id: string
          producer_facility_id: string | null
          producer_user_id: string | null
          serving_size: number | null
          unit_weight: number | null
          weight: number | null
        }
        Insert: {
          id?: string
          producer_facility_id?: string | null
          producer_user_id?: string | null
          serving_size?: number | null
          unit_weight?: number | null
          weight?: number | null
        }
        Update: {
          id?: string
          producer_facility_id?: string | null
          producer_user_id?: string | null
          serving_size?: number | null
          unit_weight?: number | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "batch_producer_facility_id_fkey"
            columns: ["producer_facility_id"]
            referencedRelation: "producer_facility"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "batch_producer_user_id_fkey"
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
      country: {
        Row: {
          country_code: string
          country_name: string
        }
        Insert: {
          country_code: string
          country_name: string
        }
        Update: {
          country_code?: string
          country_name?: string
        }
        Relationships: []
      }
      demos_scheduled: {
        Row: {
          company: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: string
          job_title: string | null
          last_name: string | null
          phone: string | null
          state: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          job_title?: string | null
          last_name?: string | null
          phone?: string | null
          state?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: string
          job_title?: string | null
          last_name?: string | null
          phone?: string | null
          state?: string | null
        }
        Relationships: []
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
      insurance_user: {
        Row: {
          id: string
        }
        Insert: {
          id?: string
        }
        Update: {
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "insurance_user_id_fkey"
            columns: ["id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      lab_facility: {
        Row: {
          address_id: string
          description: string | null
          id: string
          lab_user_id: string
          name: string
        }
        Insert: {
          address_id: string
          description?: string | null
          id?: string
          lab_user_id: string
          name?: string
        }
        Update: {
          address_id?: string
          description?: string | null
          id?: string
          lab_user_id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "lab_facility_address_id_fkey"
            columns: ["address_id"]
            referencedRelation: "address"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_facility_lab_user_id_fkey"
            columns: ["lab_user_id"]
            referencedRelation: "lab_user"
            referencedColumns: ["id"]
          }
        ]
      }
      lab_order: {
        Row: {
          analysis_id: string | null
          batch_id: string | null
          id: string
          lab_facility_id: string | null
          lab_notes: string | null
          order_time: string
          pickup_date: string | null
          turnaround_time:
            | Database["public"]["Enums"]["turnaround_time_enum"]
            | null
        }
        Insert: {
          analysis_id?: string | null
          batch_id?: string | null
          id?: string
          lab_facility_id?: string | null
          lab_notes?: string | null
          order_time?: string
          pickup_date?: string | null
          turnaround_time?:
            | Database["public"]["Enums"]["turnaround_time_enum"]
            | null
        }
        Update: {
          analysis_id?: string | null
          batch_id?: string | null
          id?: string
          lab_facility_id?: string | null
          lab_notes?: string | null
          order_time?: string
          pickup_date?: string | null
          turnaround_time?:
            | Database["public"]["Enums"]["turnaround_time_enum"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "lab_order_analysis_id_fkey"
            columns: ["analysis_id"]
            referencedRelation: "analysis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_order_batch_id_fkey"
            columns: ["batch_id"]
            referencedRelation: "batch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_order_lab_facility_id_fkey"
            columns: ["lab_facility_id"]
            referencedRelation: "lab_facility"
            referencedColumns: ["id"]
          }
        ]
      }
      lab_order_on_test: {
        Row: {
          lab_order_id: string
          test_id: string
        }
        Insert: {
          lab_order_id: string
          test_id: string
        }
        Update: {
          lab_order_id?: string
          test_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lab_order_on_test_lab_order_id_fkey"
            columns: ["lab_order_id"]
            referencedRelation: "lab_order"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_order_on_test_test_id_fkey"
            columns: ["test_id"]
            referencedRelation: "test"
            referencedColumns: ["id"]
          }
        ]
      }
      lab_user: {
        Row: {
          contact_phone: string | null
          id: string
          lab_name: string | null
          license_number: string | null
          owner_name: string | null
          parent_id: string | null
        }
        Insert: {
          contact_phone?: string | null
          id: string
          lab_name?: string | null
          license_number?: string | null
          owner_name?: string | null
          parent_id?: string | null
        }
        Update: {
          contact_phone?: string | null
          id?: string
          lab_name?: string | null
          license_number?: string | null
          owner_name?: string | null
          parent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lab_user_id_fkey"
            columns: ["id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_user_parent_id_fkey"
            columns: ["parent_id"]
            referencedRelation: "lab_user"
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
          country_code: string | null
          description: string | null
          id: string
          legal_limit: number | null
          state_code: string | null
        }
        Insert: {
          country_code?: string | null
          description?: string | null
          id?: string
          legal_limit?: number | null
          state_code?: string | null
        }
        Update: {
          country_code?: string | null
          description?: string | null
          id?: string
          legal_limit?: number | null
          state_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_molecule_wiki_state"
            columns: ["state_code", "country_code"]
            referencedRelation: "state"
            referencedColumns: ["state_code", "country_code"]
          }
        ]
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
      producer_facility: {
        Row: {
          address_id: string | null
          description: string | null
          id: string
          name: string
          producer_user_id: string
        }
        Insert: {
          address_id?: string | null
          description?: string | null
          id?: string
          name?: string
          producer_user_id: string
        }
        Update: {
          address_id?: string | null
          description?: string | null
          id?: string
          name?: string
          producer_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "producer_facility_address_id_fkey"
            columns: ["address_id"]
            referencedRelation: "address"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "producer_facility_producer_user_id_fkey"
            columns: ["producer_user_id"]
            referencedRelation: "producer_user"
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
          common_name: string | null
          id: string
          legal_name: string | null
          license_number: string | null
          license_type: Database["public"]["Enums"]["license_type_enum"] | null
        }
        Insert: {
          common_name?: string | null
          id: string
          legal_name?: string | null
          license_number?: string | null
          license_type?: Database["public"]["Enums"]["license_type_enum"] | null
        }
        Update: {
          common_name?: string | null
          id?: string
          legal_name?: string | null
          license_number?: string | null
          license_type?: Database["public"]["Enums"]["license_type_enum"] | null
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
      regulator_review: {
        Row: {
          approved: boolean
          created_at: string
          id: string
          notes: string
          regulator_user_id: string
        }
        Insert: {
          approved?: boolean
          created_at?: string
          id?: string
          notes?: string
          regulator_user_id: string
        }
        Update: {
          approved?: boolean
          created_at?: string
          id?: string
          notes?: string
          regulator_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "regulator_review_regulator_user_id_fkey"
            columns: ["regulator_user_id"]
            referencedRelation: "regulator_user"
            referencedColumns: ["id"]
          }
        ]
      }
      regulator_user: {
        Row: {
          contact_phone: string | null
          id: string
          mailing_address_id: string | null
          regulator_name: string | null
        }
        Insert: {
          contact_phone?: string | null
          id: string
          mailing_address_id?: string | null
          regulator_name?: string | null
        }
        Update: {
          contact_phone?: string | null
          id?: string
          mailing_address_id?: string | null
          regulator_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "regulator_user_id_fkey"
            columns: ["id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "regulator_user_mailing_address_id_fkey"
            columns: ["mailing_address_id"]
            referencedRelation: "address"
            referencedColumns: ["id"]
          }
        ]
      }
      sampling_firm_facility: {
        Row: {
          address_id: string
          description: string
          id: string
          name: string
          sampling_firm_user_id: string
        }
        Insert: {
          address_id: string
          description?: string
          id?: string
          name?: string
          sampling_firm_user_id: string
        }
        Update: {
          address_id?: string
          description?: string
          id?: string
          name?: string
          sampling_firm_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sampling_firm_facility_address_id_fkey"
            columns: ["address_id"]
            referencedRelation: "address"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sampling_firm_facility_sampling_firm_user_id_fkey"
            columns: ["sampling_firm_user_id"]
            referencedRelation: "sampling_firm_user"
            referencedColumns: ["id"]
          }
        ]
      }
      sampling_firm_user: {
        Row: {
          id: string
        }
        Insert: {
          id?: string
        }
        Update: {
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sampling_firm_user_id_fkey"
            columns: ["id"]
            referencedRelation: "user"
            referencedColumns: ["id"]
          }
        ]
      }
      state: {
        Row: {
          country_code: string
          state_code: string
          state_name: string
          supported: boolean
        }
        Insert: {
          country_code: string
          state_code: string
          state_name: string
          supported?: boolean
        }
        Update: {
          country_code?: string
          state_code?: string
          state_name?: string
          supported?: boolean
        }
        Relationships: []
      }
      test: {
        Row: {
          enabled: boolean
          id: string
          name: string
          test_category_name: string
        }
        Insert: {
          enabled: boolean
          id?: string
          name: string
          test_category_name: string
        }
        Update: {
          enabled?: boolean
          id?: string
          name?: string
          test_category_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "test_test_category_name_fkey"
            columns: ["test_category_name"]
            referencedRelation: "test_category"
            referencedColumns: ["name"]
          }
        ]
      }
      test_category: {
        Row: {
          enabled: boolean
          name: string
        }
        Insert: {
          enabled: boolean
          name: string
        }
        Update: {
          enabled?: boolean
          name?: string
        }
        Relationships: []
      }
      test_requirement: {
        Row: {
          country_code: string
          description: string
          id: string
          name: string
          state_code: string | null
          test_id: string
          type: Database["public"]["Enums"]["requirement_type"]
        }
        Insert: {
          country_code: string
          description?: string
          id?: string
          name?: string
          state_code?: string | null
          test_id: string
          type: Database["public"]["Enums"]["requirement_type"]
        }
        Update: {
          country_code?: string
          description?: string
          id?: string
          name?: string
          state_code?: string | null
          test_id?: string
          type?: Database["public"]["Enums"]["requirement_type"]
        }
        Relationships: [
          {
            foreignKeyName: "fk_test_requirement"
            columns: ["state_code", "country_code"]
            referencedRelation: "state"
            referencedColumns: ["state_code", "country_code"]
          },
          {
            foreignKeyName: "test_requirement_country_code_fkey"
            columns: ["country_code"]
            referencedRelation: "country"
            referencedColumns: ["country_code"]
          },
          {
            foreignKeyName: "test_requirement_test_id_fkey"
            columns: ["test_id"]
            referencedRelation: "test"
            referencedColumns: ["id"]
          }
        ]
      }
      test_result: {
        Row: {
          analysis_id: string
          id: string
          result: string
          test_requirement_id: string
        }
        Insert: {
          analysis_id: string
          id?: string
          result: string
          test_requirement_id: string
        }
        Update: {
          analysis_id?: string
          id?: string
          result?: string
          test_requirement_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "test_result_analysis_id_fkey"
            columns: ["analysis_id"]
            referencedRelation: "analysis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "test_result_test_requirement_id_fkey"
            columns: ["test_requirement_id"]
            referencedRelation: "test_requirement"
            referencedColumns: ["id"]
          }
        ]
      }
      university_facility: {
        Row: {
          address_id: string
          id: string
          university_user_id: string
        }
        Insert: {
          address_id: string
          id?: string
          university_user_id: string
        }
        Update: {
          address_id?: string
          id?: string
          university_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "university_facility_address_id_fkey"
            columns: ["address_id"]
            referencedRelation: "address"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "university_facility_university_user_id_fkey"
            columns: ["university_user_id"]
            referencedRelation: "university_user"
            referencedColumns: ["id"]
          }
        ]
      }
      university_user: {
        Row: {
          id: string
          primary_investigator: string | null
          university_department: string | null
          university_name: string | null
        }
        Insert: {
          id: string
          primary_investigator?: string | null
          university_department?: string | null
          university_name?: string | null
        }
        Update: {
          id?: string
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
      delete_claim: {
        Args: {
          uid: string
          claim: string
        }
        Returns: string
      }
      get_claim: {
        Args: {
          uid: string
          claim: string
        }
        Returns: Json
      }
      get_claims: {
        Args: {
          uid: string
        }
        Returns: Json
      }
      get_my_claim: {
        Args: {
          claim: string
        }
        Returns: Json
      }
      get_my_claims: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      is_claims_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      set_claim: {
        Args: {
          uid: string
          claim: string
          value: Json
        }
        Returns: string
      }
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
      product_type_enum: "flower" | "concentrate" | "edibles" | "infusion"
      requirement_type:
        | "boolean"
        | "integer"
        | "float"
        | "string"
        | "date"
        | "timestamp"
        | "text"
        | "json"
      turnaround_time_enum: "48" | "96" | "168" | "336"
      user_type_enum:
        | "consumer"
        | "regulator"
        | "lab"
        | "producer"
        | "university"
        | "sampling_firm"
        | "insurance"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
