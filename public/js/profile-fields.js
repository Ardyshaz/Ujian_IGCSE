export const PROFILE_STATES=['Johor','Kedah','Kelantan','Melaka','Negeri Sembilan','Pahang','Perak','Perlis','Pulau Pinang','Sabah','Sarawak','Selangor','Terengganu','W.P. Kuala Lumpur','W.P. Labuan','W.P. Putrajaya'];
export const PROFILE_YEARS=[...Array.from({length:6},(_,i)=>[`Year ${i+1}`,`Darjah ${i+1}`]),...Array.from({length:5},(_,i)=>[`Form ${i+1}`,`Tingkatan ${i+1}`]),['Other','Lain-lain']];
export function profileFields(input){
 const fields={display_name:String(input.displayName||'').trim(),guardian_name:String(input.guardianName||'').trim(),year_level:String(input.yearLevel||''),school_name:String(input.schoolName||'').trim(),state:String(input.state||'')};
 if(!fields.display_name||fields.display_name.length>60)throw new Error('Nama paparan perlu antara 1 hingga 60 aksara.');
 if(fields.guardian_name.length>60||fields.year_level.length>30||fields.school_name.length>100)throw new Error('Butiran profil terlalu panjang.');
 if(fields.state&&!PROFILE_STATES.includes(fields.state))throw new Error('Pilih negeri atau wilayah daripada senarai.');
 return fields;
}
