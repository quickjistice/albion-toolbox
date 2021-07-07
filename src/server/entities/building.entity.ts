import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity()
export class Building {
    @PrimaryColumn()
    uniquename: string;

    @Column()
    tier: number;

    @Column({ nullable: true })
    category: string | null;

    @Column()
    displaygroup: number;

    @ManyToMany(() => Item, (item) => item.uniquename, { cascade: true })
    @JoinTable()
    craftingitemlist: Item[];
}
