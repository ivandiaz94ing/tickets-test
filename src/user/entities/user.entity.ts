import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        unique: true
    })
    email: string;
    
    @Column('text')
    password: string;
    
    @Column('text')
    fullname: string;
    
    @Column('bool')
    isActive: boolean=true;
    
    @Column('text', {
        array: true,
        default: ['cliente']
    })
    roles: string[]= ['cliente'];
}
