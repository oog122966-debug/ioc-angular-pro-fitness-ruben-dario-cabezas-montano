import { Rutina } from './rutina.model';

export const RUTINAS_MOCK: Rutina[] = [
  {
    id: 1,
    nombre: 'Full Body Principiante',
    descripcion: 'Rutina completa para iniciarse en el entrenamiento de fuerza.',
    categoria: 'Fuerza',
    fechaCreacion: new Date('2025-01-10'),
    duracionMinutos: 45,
    destacada: true
  },
  {
    id: 2,
    nombre: 'Cardio HIIT Express',
    descripcion: 'Entrenamiento interválico de alta intensidad en poco tiempo.',
    categoria: 'Cardio',
    fechaCreacion: new Date('2025-02-15'),
    duracionMinutos: 20,
    destacada: true
  },
  {
    id: 3,
    nombre: 'Movilidad y Estiramientos',
    descripcion: 'Sesión suave para mejorar la flexibilidad y recuperación.',
    categoria: 'Flexibilidad',
    fechaCreacion: new Date('2025-03-05'),
    duracionMinutos: 30,
    destacada: false
  },
  {
    id: 4,
    nombre: 'Piernas y Glúteos',
    descripcion: 'Rutina enfocada en el tren inferior con ejercicios compuestos.',
    categoria: 'Fuerza',
    fechaCreacion: new Date('2025-03-20'),
    duracionMinutos: 50,
    destacada: false
  },
  {
    id: 5,
    nombre: 'Core y Abdominales',
    descripcion: 'Trabajo específico de la zona media para mejorar la estabilidad.',
    categoria: 'Core',
    fechaCreacion: new Date('2025-04-02'),
    duracionMinutos: 25,
    destacada: false
  },
  {
    id: 6,
    nombre: 'Espalda y Bíceps',
    descripcion: 'Rutina de tracción para fortalecer la espalda y los brazos.',
    categoria: 'Fuerza',
    fechaCreacion: new Date('2025-04-18'),
    duracionMinutos: 55,
    destacada: true
  },
  {
    id: 7,
    nombre: 'Cardio Continuo Suave',
    descripcion: 'Sesión de cardio de baja intensidad para mejorar la resistencia.',
    categoria: 'Cardio',
    fechaCreacion: new Date('2025-05-01'),
    duracionMinutos: 40,
    destacada: false
  },
  {
    id: 8,
    nombre: 'Pecho y Tríceps',
    descripcion: 'Rutina de empuje para desarrollar el tren superior.',
    categoria: 'Fuerza',
    fechaCreacion: new Date('2025-05-12'),
    duracionMinutos: 50,
    destacada: false
  },
  {
    id: 9,
    nombre: 'Yoga para Deportistas',
    descripcion: 'Secuencia de posturas para equilibrar cuerpo y mente.',
    categoria: 'Flexibilidad',
    fechaCreacion: new Date('2025-05-25'),
    duracionMinutos: 35,
    destacada: true
  },
  {
    id: 10,
    nombre: 'Circuito Metabólico',
    descripcion: 'Combinación de fuerza y cardio para aumentar el gasto calórico.',
    categoria: 'Cardio',
    fechaCreacion: new Date('2025-06-08'),
    duracionMinutos: 45,
    destacada: false
  }
];