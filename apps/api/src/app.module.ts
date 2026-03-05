import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { UserDeviceModule } from './user-device/user-device.module';
import { TokenModule } from './token/token.module';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { SpecializationModule } from './specialization/specialization.module';
import { DegreeModule } from './degree/degree.module';
import { MedicineModule } from './medicine/medicine.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { MedicinePrescriptionModule } from './medicine-prescription/medicine-prescription.module';
import { CompanyModule } from './company/company.module';
import { CompanySettingModule } from './company-setting/company-setting.module';

@Module({
  imports: [UserModule, UserDeviceModule, TokenModule, PatientModule, DoctorModule, SpecializationModule, DegreeModule, MedicineModule, PrescriptionModule, MedicinePrescriptionModule, CompanyModule, CompanySettingModule],
  controllers: [AppController],
})
export class AppModule { }
