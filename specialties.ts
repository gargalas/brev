// data/specialties.ts
// Central catalogue used by onboarding TagCloud.
// IDs are lowercase slugs; names are human-readable.
// Add/trim topics here and they’ll flow straight into onboarding.

export type Specialty = {
  id: string;
  name: string;
  subs: Array<{
    id: string;
    name: string;
    topics: string[];
  }>;
};

export const SPECIALTIES: Specialty[] = [
  // =========================================================
  // Radiology (existing)
  // =========================================================
  {
    id: "radiology",
    name: "Radiology",
    subs: [
      // ----------------------------------------------------
      // Interventional Neuroradiology (rich topic set)
      // ----------------------------------------------------
      {
        id: "interventional-neuroradiology",
        name: "Interventional Neuroradiology",
        topics: [
          // Aneurysm treatment
          "Flow diverter (FD)",
          "Intrasaccular devices (WEB/MED)",
          "Coil embolization",
          "Stent-assisted coiling",
          "Balloon-assisted coiling",
          "Bypass & parent vessel occlusion",
          "Wide-neck aneurysms",
          "Blister aneurysms",
          "Ruptured aneurysm workflows",
          "Antiplatelet strategies (DAPT/monotherapy)",
          // Ischemic stroke
          "Mechanical thrombectomy (MT)",
          "Rescue stenting",
          "Tandem lesions",
          "Distal/medium vessel occlusion (DMVO)",
          "Bridging IVT vs direct MT",
          "First-pass effect",
          // AVM/AVF
          "Brain AVM embolization (Onyx/PHIL/EVOH)",
          "Dural AVF classification & treatment",
          "Spinal AV shunts",
          "Venous hypertension management",
          // Carotid & intracranial atherosclerosis
          "Carotid stenting (CAS)",
          "Intracranial atherosclerotic disease (ICAS) stenting",
          "TICI/TIMI & perfusion imaging",
          // Complications & peri-procedural care
          "Perforation & hemorrhage management",
          "Vasospasm treatment (IA verapamil/nicardipine)",
          "Thromboembolic complications",
          "Access strategies (radial vs femoral)",
          "Heparinization protocols",
          "Reversal agents",
          // Devices & imaging
          "Detachable-tip microcatheters",
          "Aspiration catheters",
          "Stentrievers",
          "Dual-lumen balloons",
          "3D roadmapping / cone-beam CT",
          // Special territories
          "Posterior circulation interventions",
          "Pcom/Acom/ICA terminus nuances",
          "Distal ACA/MCA/PCA strategies",
          // Outcomes & evidence
          "Hunt-Hess/Fisher scales",
          "mRS outcomes",
          "Core–penumbra selection (CTP/MR perfusion)",
          "CRETE/CRETA registry learnings",
        ],
      },
      // ----------------------------------------------------
      // Diagnostic Neuroradiology (rich topic set)
      // ----------------------------------------------------
      {
        id: "diagnostic-neuroradiology",
        name: "Diagnostic Neuroradiology",
        topics: [
          // Stroke & vascular
          "Acute stroke imaging (NCCT/CTA/CTP)",
          "Posterior circulation stroke",
          "Large vessel occlusion (LVO) signs",
          "Hemorrhage (ICH/SAH) patterns",
          "Vasculitis & RCVS",
          "Dural AVF diagnosis",
          // Tumors & neuro-oncology
          "Glioma grading & molecular markers",
          "Perfusion MRI (rCBV/DSC/ASL)",
          "MR spectroscopy",
          "Treatment response vs pseudoprogression",
          "Metastases patterns",
          // Infection/inflammation
          "Abscess vs necrotic tumor",
          "TB/fungal CNS disease",
          "Multiple sclerosis (McDonald criteria)",
          "ADEM/MOG spectrum",
          // Epilepsy & functional
          "Mesial temporal sclerosis",
          "Cortical dysplasia",
          "Pre-surgical mapping (fMRI/DTI)",
          // Spine
          "Degenerative spine (Modic/disc)",
          "Spinal infection vs neoplasm",
          "CSF leaks & SIH",
          "Spinal vascular shunts",
          // Head & neck
          "Sinonasal tumors",
          "Perineural spread",
          "Temporal bone pathology",
          "Orbits & sellar region",
          // Pediatrics & congenital
          "Posterior fossa malformations",
          "Neonatal hypoxic-ischemic injury",
          // Advanced techniques
          "SWI & microbleeds",
          "DTI tractography",
          "Arterial spin labeling",
          "Vessel wall MRI",
          "CT perfusion pitfalls",
        ],
      },
      // ----------------------------------------------------
      // Musculoskeletal Radiology (rich topic set)
      // ----------------------------------------------------
      {
        id: "musculoskeletal-radiology",
        name: "Musculoskeletal Radiology",
        topics: [
          // Shoulder
          "Rotator cuff tears (partial/full-thickness)",
          "Subscapularis & biceps pulley",
          "Labral variants & tears",
          "Adhesive capsulitis",
          // Knee
          "Meniscal tears/roots/ramp lesions",
          "ACL/PCL injury",
          "Chondral & osteochondral lesions",
          "Patellofemoral instability",
          // Hip
          "Femoroacetabular impingement (FAI)",
          "Labral tears & CAM/Pincer",
          "Avascular necrosis",
          // Foot & ankle
          "Tendon pathology (PTT/ATFL/Achilles)",
          "Lisfranc & midfoot injuries",
          "Plantar plate tears",
          // Tendon & enthesis
          "Enthesitis & seronegative arthropathy",
          "Tendinopathy vs tear",
          // Sports imaging
          "Muscle strain/contusion & return-to-play",
          "Stress fractures",
          // Arthritis
          "Osteoarthritis & grading",
          "Rheumatoid & seronegative arthritis",
          "CPPD/Crystalline arthropathies",
          // Tumors & infection
          "Bone tumors (Enneking/Lodwick)",
          "Soft tissue sarcomas",
          "Osteomyelitis & septic arthritis",
          // Interventions
          "MSK ultrasound-guided injections",
          "Barbotage & calcific tendinitis",
          "Biopsy techniques",
          // Advanced
          "Discoplasty",
          "Basivertebral nerve ablation",
          "Post-operative spine",
          "MR neurography",
          "Cartilage mapping (T2/T1ρ)",
          "Dual-energy CT in MSK",
          "Radiomics & AI in MSK",
        ],
      },
      // ----------------------------------------------------
      // Other subs (lighter topic sets)
      // ----------------------------------------------------
      {
        id: "interventional-radiology",
        name: "Interventional Radiology (Body)",
        topics: [
          "TACE/TARE (HCC/NET)",
          "Percutaneous ablation (RFA/MWA/Cryo)",
          "PE & DVT thrombectomy",
          "Uterine fibroid embolization",
          "Prostate artery embolization",
          "TIPS & portal interventions",
          "Biliary & GU interventions",
          "Trauma embolization",
        ],
      },
      {
        id: "chest-thoracic",
        name: "Chest & Thoracic",
        topics: [
          "Lung cancer screening & Lung-RADS",
          "ILAs & ILD patterns",
          "Pulmonary embolism CT",
          "Mediastinal masses",
          "Pleural disease",
          "Infections & nodules",
        ],
      },
      {
        id: "abdominal-gi",
        name: "Abdominal / GI",
        topics: [
          "LI-RADS & HCC",
          "Pancreatic lesions & PI-RADS-like lexicon",
          "IBD imaging (MR enterography)",
          "Biliary tree & stones",
          "Acute abdomen CT",
        ],
      },
      {
        id: "breast",
        name: "Breast",
        topics: [
          "Screening & diagnostic mammography",
          "Breast ultrasound",
          "Breast MRI & BI-RADS",
          "Image-guided biopsy",
          "Post-treatment change vs recurrence",
        ],
      },
      {
        id: "pediatric",
        name: "Pediatric Radiology",
        topics: [
          "Neonatal imaging",
          "Pediatric ultrasound",
          "Dose optimization",
          "Congenital anomalies",
        ],
      },
      {
        id: "nuclear",
        name: "Nuclear Medicine",
        topics: [
          "FDG PET-CT",
          "PSMA/FDOPA tracers",
          "Theranostics",
          "Cardiac perfusion",
        ],
      },
      {
        id: "cardiac",
        name: "Cardiac Imaging",
        topics: [
          "Cardiac CT (calcium/CTA)",
          "CMR (viability/edema/LGE)",
          "Valvular disease",
          "Cardiomyopathies",
        ],
      },
      {
        id: "head-neck",
        name: "Head & Neck",
        topics: [
          "Sinonasal tumors",
          "Thyroid & salivary disease",
          "Perineural spread",
          "ENT emergencies",
        ],
      },
      {
        id: "ultrasound",
        name: "General Ultrasound",
        topics: [
          "Abdominal US",
          "DVT & vascular US",
          "Thyroid & neck US",
          "Point-of-care US (POCUS)",
        ],
      },
    ],
  },

  // =========================================================
  // NEW: Neurosurgery
  // =========================================================
  {
    id: "neurosurgery",
    name: "Neurosurgery",
    subs: [
      {
        id: "vascular",
        name: "Cerebrovascular",
        topics: [
          "Microsurgical aneurysm clipping",
          "Bypass (STA–MCA, EC–IC)",
          "AVM resection strategies",
          "Cavernous malformation surgery",
          "Dural AVF disconnection",
          "Carotid endarterectomy",
          "Carotid–cavernous fistula",
          "Moyamoya revascularization",
          "Vasospasm management",
        ],
      },
      {
        id: "skull-base",
        name: "Skull Base",
        topics: [
          "Acoustic neuroma (vestibular schwannoma)",
          "Meningioma skull-base approaches",
          "Clival & petroclival lesions",
          "Endoscopic endonasal approaches",
          "Chordoma/chondrosarcoma",
          "Cranial nerve schwannomas",
          "Cerebellopontine angle tumors",
          "CSF leak repair",
        ],
      },
      {
        id: "spine",
        name: "Spine",
        topics: [
          "Cervical myelopathy (ACDF/laminoplasty)",
          "Lumbar stenosis (decompression/fusion)",
          "Spondylolisthesis reduction",
          "Odontoid & upper cervical instability",
          "Spinal tumors (intradural/intramedullary)",
          "Spinal infections",
          "Deformity correction (scoliosis/kyphosis)",
          "Minimally invasive TLIF/XLIF",
        ],
      },
      {
        id: "tumor",
        name: "Tumor / Neuro-oncology",
        topics: [
          "Glioma resection (awake mapping)",
          "5-ALA fluorescence guidance",
          "Metastasis resection",
          "Meningioma grading & sinus invasion",
          "Pineal & posterior fossa tumors",
          "Intraoperative MRI/ultrasound",
          "Laser interstitial thermal therapy (LITT)",
        ],
      },
      {
        id: "functional",
        name: "Functional & Epilepsy",
        topics: [
          "Deep brain stimulation (DBS)",
          "Stereoelectroencephalography (SEEG)",
          "Resective epilepsy surgery",
          "Vagus nerve stimulation",
          "Focused ultrasound thalamotomy",
          "Movement disorder targets (STN/GPi/Vim)",
        ],
      },
      {
        id: "pediatric-ns",
        name: "Pediatric Neurosurgery",
        topics: [
          "Craniosynostosis",
          "Hydrocephalus & shunts",
          "Posterior fossa tumors",
          "Spina bifida & tethered cord",
          "Chiari malformations",
          "Endoscopic third ventriculostomy (ETV)",
        ],
      },
      {
        id: "trauma-ns",
        name: "Neurotrauma & Critical Care",
        topics: [
          "Decompressive craniectomy",
          "ICH evacuation",
          "Skull fractures & CSF leaks",
          "ICP monitoring",
          "Spinal trauma stabilization",
          "Anticoagulation reversal",
        ],
      },
      {
        id: "peripheral-nerve",
        name: "Peripheral Nerve",
        topics: [
          "Brachial plexus reconstruction",
          "Nerve grafts & transfers",
          "Entrapment neuropathies",
          "Neuroma resection",
        ],
      },
      {
        id: "radiosurgery",
        name: "Radiosurgery",
        topics: [
          "Gamma Knife for AVM",
          "SRS for metastases",
          "SRS for vestibular schwannoma",
          "Dose planning & constraints",
        ],
      },
      {
        id: "pain-ns",
        name: "Pain & Spine Functional",
        topics: [
          "Spinal cord stimulation",
          "Dorsal root ganglion stimulation",
          "Intrathecal pumps",
          "Rhizotomy procedures",
        ],
      },
    ],
  },

  // =========================================================
  // NEW: Neurology
  // =========================================================
  {
    id: "neurology",
    name: "Neurology",
    subs: [
      {
        id: "stroke-vascular-neuro",
        name: "Stroke & Vascular Neurology",
        topics: [
          "Acute stroke code & thrombolysis",
          "Large vessel occlusion triage",
          "Posterior circulation stroke",
          "TIA & secondary prevention",
          "Cerebral venous sinus thrombosis",
          "Intracerebral hemorrhage care",
          "Cervical artery dissection",
          "Atrial fibrillation & anticoagulation",
        ],
      },
      {
        id: "epilepsy",
        name: "Epilepsy",
        topics: [
          "Seizure semiology & EEG",
          "Drug-resistant epilepsy workup",
          "Pre-surgical evaluation (fMRI/MEG)",
          "SEEG & intracranial monitoring",
          "Ketogenic diet & ASM optimization",
          "Status epilepticus management",
        ],
      },
      {
        id: "movement-disorders",
        name: "Movement Disorders",
        topics: [
          "Parkinson disease",
          "Atypical parkinsonism (PSP/MSA/CBD)",
          "Essential tremor",
          "Dystonia",
          "DBS candidacy & programming",
          "Gait & balance disorders",
        ],
      },
      {
        id: "demyelinating",
        name: "Demyelinating & Neuroimmunology",
        topics: [
          "Multiple sclerosis (McDonald)",
          "MOGAD",
          "NMOSD (AQP4)",
          "CIS/RIS management",
          "Disease-modifying therapies",
          "MRI monitoring",
        ],
      },
      {
        id: "neuromuscular",
        name: "Neuromuscular",
        topics: [
          "ALS & motor neuron disease",
          "CIDP & Guillain–Barré",
          "Myasthenia gravis",
          "Myopathies (inflammatory/metabolic)",
          "EMG/NCS interpretation",
          "Hereditary neuropathies",
        ],
      },
      {
        id: "headache",
        name: "Headache & Pain",
        topics: [
          "Migraine (acute/preventive)",
          "Cluster & TACs",
          "Medication overuse headache",
          "IIH & CSF pressure disorders",
          "Cervicogenic headache",
        ],
      },
      {
        id: "cognitive",
        name: "Cognitive & Behavioral",
        topics: [
          "Alzheimer disease & biomarkers",
          "FTD spectrum",
          "Lewy body dementia",
          "Vascular cognitive impairment",
          "Mild cognitive impairment",
          "Neuropsychiatric symptoms", "Traumatic brain injury (TBI)"
        ],
      },
      {
        id: "neurocritical",
        name: "Neurocritical Care",
        topics: [
          "Airway & ventilation in neuro ICU",
          "ICP, CPP monitoring",
          "SAH & vasospasm",
          "Refractory status epilepticus",
          "Hypothermia & neuroprotection",
        ],
      },
      {
        id: "autonomic",
        name: "Autonomic & Dysautonomia",
        topics: [
          "POTS",
          "Orthostatic hypotension",
          "Syncope workup",
          "Autonomic testing",
        ],
      },
      {
        id: "sleep-neuro",
        name: "Sleep Neurology",
        topics: [
          "Insomnia & CBT-I",
          "OSA & CPAP adherence",
          "Narcolepsy",
          "RBD & parasomnias",
          "Restless legs syndrome",
        ],
      },
      {
        id: "neuroimmunology-infectious",
        name: "Neuroinfectious",
        topics: [
          "Viral encephalitis",
          "TB/fungal CNS infections",
          "HIV neurology",
          "Post-infectious syndromes",
        ],
      },
      {
        id: "pediatric-neuro",
        name: "Pediatric Neurology",
        topics: [
          "Infantile spasms",
          "Neurogenetics & metabolic",
          "Developmental delay",
          "Neuromuscular pediatrics",
        ],
      },
    ],
  },

  // =========================================================
  // NEW: Cardiology
  // =========================================================
  {
    id: "cardiology",
    name: "Cardiology",
    subs: [
      {
        id: "interventional",
        name: "Interventional Cardiology",
        topics: [
          "ACS & primary PCI",
          "Chronic total occlusion (CTO) PCI",
          "Radial vs femoral access",
          "Intravascular imaging (IVUS/OCT)",
          "Physiology (FFR/iFR)",
          "Mechanical circulatory support (Impella/IABP/ECMO)",
          "Bifurcation lesions",
          "Stent thrombosis & restenosis",
        ],
      },
      {
        id: "electrophysiology",
        name: "Cardiac Electrophysiology",
        topics: [
          "Atrial fibrillation ablation",
          "Flutter & SVT ablation",
          "Ventricular tachycardia ablation",
          "CRT/ICD implantation & follow-up",
          "Conduction system pacing (HBP/LBBP)",
          "Syncope evaluation",
          "Inherited arrhythmia syndromes",
        ],
      },
      {
        id: "heart-failure",
        name: "Heart Failure & Transplant",
        topics: [
          "HFrEF/HFpEF management",
          "SGLT2/ARNI/BB/MRA optimization",
          "Advanced therapies (LVAD/transplant)",
          "Cardio-renal syndrome",
          "Pulmonary hypertension",
          "Cardiac amyloidosis",
        ],
      },
      {
        id: "structural",
        name: "Structural Heart Disease",
        topics: [
          "TAVR/TAVI",
          "MitraClip/TEER",
          "Left atrial appendage occlusion",
          "ASD/PFO closure",
          "Paravalvular leak closure",
          "Tricuspid interventions",
        ],
      },
      {
        id: "imaging-cardiology",
        name: "Cardiac Imaging",
        topics: [
          "Echocardiography (strain/3D/contrast)",
          "Cardiac CT (calcium score/CTA/FFR-CT)",
          "CMR (LGE/T1/T2 mapping)",
          "Viability & perfusion",
          "Valve assessment by imaging",
        ],
      },
      {
        id: "preventive",
        name: "Preventive Cardiology",
        topics: [
          "Lipidology (statins/PCSK9/Inclisiran)",
          "Hypertension",
          "Diabetes & CV risk",
          "Obesity & metabolic syndrome",
          "Smoking cessation",
          "Aspirin & primary prevention",
        ],
      },
      {
        id: "valvular",
        name: "Valvular Heart Disease",
        topics: [
          "Aortic stenosis",
          "Aortic regurgitation",
          "Mitral regurgitation",
          "Mitral stenosis",
          "Tricuspid disease",
          "Endocarditis",
        ],
      },
      {
        id: "congenital-adult",
        name: "Adult Congenital Heart Disease",
        topics: [
          "Tetralogy of Fallot",
          "Transposition variants",
          "Fontan physiology",
          "Coarctation",
          "Pulmonary atresia",
          "Pregnancy in congenital heart disease",
        ],
      },
      {
        id: "cardio-oncology",
        name: "Cardio-Oncology",
        topics: [
          "Anthracycline cardiotoxicity",
          "HER2 therapy cardiotoxicity",
          "Immune checkpoint myocarditis",
          "Radiation heart disease",
          "Survivorship & surveillance",
        ],
      },
      {
        id: "sports-cardiology",
        name: "Sports Cardiology",
        topics: [
          "Pre-participation screening",
          "Athlete’s heart vs pathology",
          "Arrhythmias in athletes",
          "Return-to-play after myocarditis",
        ],
      },
      {
        id: "vascular-aorta",
        name: "Aorta & Vascular",
        topics: [
          "Aortic aneurysm & dissection",
          "Peripheral arterial disease",
          "Carotid disease & stroke prevention",
          "Aortic imaging",
        ],
      },
      {
        id: "women-heart",
        name: "Women’s Heart Health",
        topics: [
          "Ischemia with no obstructive CAD (INOCA)",
          "MINOCA",
          "Pregnancy-related cardiovascular disease",
          "Spontaneous coronary artery dissection (SCAD)",
        ],
      },
    ],
  },
];

// Flatten helpers
export function findSpecialty(id: string) {
  return SPECIALTIES.find(s => s.id === id) || null;
}