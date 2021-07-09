import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Item } from './item.entity';

@Entity()
export class Building {
    @PrimaryColumn()
    uniquename: string;

    @Column({ nullable: true })
    category: string;

    @Column({ nullable: true })
    favoritedish: string;

    @OneToMany(() => Item, (item) => item.craftBuilding)
    items: Item[];
}
