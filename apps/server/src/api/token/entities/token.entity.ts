import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToOne,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import type { UserDevice } from '../../user-device/entities/user-device.entity';
import type { User } from '../../user/entities/user.entity';

export enum TokenType {
    ACCESS = 'access',
    REFRESH = 'refresh',
    RESET_PASSWORD = 'reset_password',
    VERIFY_EMAIL = 'verify_email',
}

@Entity('tokens')
export class Token extends BaseEntity {
    @Index('idx_tokens_token')
    @Column({ unique: true, type: 'text' })
    token!: string;

    @Column({
        name: 'token_type',
        type: 'enum',
        enum: TokenType,
        default: TokenType.ACCESS,
    })
    tokenType!: TokenType;

    @Column({ name: 'expires_at', type: 'timestamptz' })
    expiresAt!: Date;

    @Index('idx_tokens_user_device_id')
    @Column({ name: 'user_device_id' })
    userDeviceId!: number;

    @Index('idx_tokens_user_id')
    @Column({ name: 'user_id' })
    userId!: number;

    // ---- Relations ----
    @OneToOne('UserDevice', (device: UserDevice) => device.token)
    @JoinColumn({ name: 'user_device_id' })
    userDevice!: UserDevice;

    @ManyToOne('User', (user: User) => user.devices)
    @JoinColumn({ name: 'user_id' })
    user!: User;
}
