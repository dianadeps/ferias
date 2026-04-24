import { z } from 'zod';

// ============================================
// AUTH SCHEMAS
// ============================================

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres')
});

export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  department: z.string().min(2, 'Departamento obrigatório'),
  team: z.string().min(2, 'Time obrigatório'),
  position: z.string().min(2, 'Cargo obrigatório'),
  admissionDate: z.string().datetime('Data inválida'),
  vacationDays: z.number().int().min(0).default(20)
});

// ============================================
// EMPLOYEE SCHEMAS
// ============================================

export const createEmployeeSchema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  email: z.string().email('Email inválido'),
  department: z.string().min(2, 'Departamento obrigatório'),
  team: z.string().min(2, 'Time obrigatório'),
  position: z.string().min(2, 'Cargo obrigatório'),
  admissionDate: z.coerce.date(),
  vacationDays: z.number().int().min(0).default(20)
});

export const updateEmployeeSchema = createEmployeeSchema.partial();

// ============================================
// VACATION REQUEST SCHEMAS
// ============================================

export const vacationPeriodSchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  totalDays: z.number().int().min(1),
  businessDays: z.number().int().min(1)
});

export const createVacationRequestSchema = z.object({
  employeeId: z.string().uuid('ID de colaborador inválido'),
  periods: z.array(vacationPeriodSchema).min(1).max(3),
  totalDays: z.number().int().min(1),
  businessDays: z.number().int().min(1)
}).refine((data) => {
  // Validate that periods don't overlap
  const sorted = [...data.periods].sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
  
  for (let i = 0; i < sorted.length - 1; i++) {
    const endCurrent = new Date(sorted[i].endDate);
    const startNext = new Date(sorted[i + 1].startDate);
    if (endCurrent >= startNext) {
      return false;
    }
  }
  return true;
}, {
  message: 'Períodos de férias não podem se sobrepor',
  path: ['periods']
});

export const approveVacationRequestSchema = z.object({
  rejectionReason: z.string().optional()
});

export const rejectVacationRequestSchema = z.object({
  rejectionReason: z.string().min(5, 'Justificativa deve ter no mínimo 5 caracteres')
});

// ============================================
// TEAM VACATION LIMIT SCHEMAS
// ============================================

export const createTeamVacationLimitSchema = z.object({
  team: z.string().min(2, 'Nome do time obrigatório'),
  maxPeople: z.number().int().min(1, 'Mínimo 1 pessoa')
});

export const updateTeamVacationLimitSchema = z.object({
  maxPeople: z.number().int().min(1, 'Mínimo 1 pessoa')
});

// ============================================
// HOLIDAY SCHEMAS
// ============================================

export const createHolidaySchema = z.object({
  date: z.coerce.date(),
  name: z.string().min(2, 'Nome do feriado obrigatório'),
  type: z.enum(['NATIONAL', 'STATE', 'MUNICIPAL']),
  state: z.string().length(2).optional().nullable(),
  city: z.string().optional().nullable()
});

export const updateHolidaySchema = createHolidaySchema.partial();

// ============================================
// TYPE EXPORTS
// ============================================

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeInput = z.infer<typeof updateEmployeeSchema>;
export type CreateVacationRequestInput = z.infer<typeof createVacationRequestSchema>;
export type VacationPeriodInput = z.infer<typeof vacationPeriodSchema>;
export type ApproveVacationRequestInput = z.infer<typeof approveVacationRequestSchema>;
export type RejectVacationRequestInput = z.infer<typeof rejectVacationRequestSchema>;
export type CreateTeamVacationLimitInput = z.infer<typeof createTeamVacationLimitSchema>;
export type UpdateTeamVacationLimitInput = z.infer<typeof updateTeamVacationLimitSchema>;
export type CreateHolidayInput = z.infer<typeof createHolidaySchema>;
export type UpdateHolidayInput = z.infer<typeof updateHolidaySchema>;
