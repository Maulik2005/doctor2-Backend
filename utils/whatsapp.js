/**

 * Builds a WhatsApp redirect URL with pre-filled appointment details.

 * Uses wa.me format — works on mobile and desktop (opens WhatsApp Web).

 */



const formatDoctorName = (name) => {

  if (!name) return 'Doctor unavailable';

  const trimmed = name.trim();

  return /^dr\.?\s/i.test(trimmed) ? trimmed : `Dr. ${trimmed}`;

};



export const buildWhatsAppUrl = (appointment, patient, doctor) => {

  const clinicNumber = process.env.WHATSAPP_CLINIC_NUMBER || '919876543210';



  const dateStr = appointment?.appointmentDate

    ? new Date(appointment.appointmentDate).toLocaleDateString('en-IN', {

        weekday: 'long',

        year: 'numeric',

        month: 'long',

        day: 'numeric',

      })

    : 'Date unavailable';



  const message = [

    '🌿 *Shreeshakti Ayurveda - Appointment Confirmation*',

    '',

    `*Patient:* ${patient?.name ?? 'Unavailable'}`,

    `*Phone:* ${patient?.phone ?? '—'}`,

    `*Email:* ${patient?.email ?? '—'}`,

    '',

    `*Doctor:* ${formatDoctorName(doctor?.name)}`,

    `*Specialization:* ${doctor?.specialization ?? '—'}`,

    '',

    `*Date:* ${dateStr}`,

    `*Time:* ${appointment?.timeSlot ?? '—'}`,

    `*Reason:* ${appointment?.reason ?? '—'}`,

    `*Status:* ${appointment?.status ?? '—'}`,

    '',

    'Please confirm this appointment. Thank you!',

  ].join('\n');



  const encoded = encodeURIComponent(message);

  return `https://wa.me/${clinicNumber}?text=${encoded}`;

};


