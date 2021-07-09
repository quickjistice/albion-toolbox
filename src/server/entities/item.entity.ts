import {
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Building } from './building.entity';

class CraftingRequirments {
    @Column({ nullable: true })
    silver: number;

    @Column({ nullable: true })
    amountcrafted: number;

    @Column({ nullable: true })
    forcesinglecraft: boolean;

    @Column({ nullable: true })
    craftingfocus: number;

    @Column({ type: 'decimal', default: 0 })
    time: number;
}

class Categories {
    @Column()
    shop: string;

    @Column()
    shopsub1: string;

    @Column({ nullable: true })
    crafting: string;
}

@Entity()
export class Item {
    @PrimaryColumn()
    uniquename: string;

    @Column()
    tier: number;

    @Column(() => Categories)
    categories: Categories;

    @Column(() => CraftingRequirments)
    requirements: CraftingRequirments;

    @OneToMany(() => CraftingResource, (resource) => resource.item, {
        cascade: true,
        eager: true,
    })
    resources: CraftingResource[];

    @OneToMany(() => CraftingEnchantment, (enc) => enc.item, {
        cascade: true,
        eager: true,
    })
    enchantments: CraftingEnchantment[];

    @ManyToOne(() => Building, (building) => building.uniquename)
    craftBuilding: Building;
}

@Entity()
export class CraftingEnchantment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    uniquename: string;

    @Column()
    level: number;

    @Column(() => CraftingRequirments)
    requirements: CraftingRequirments;

    @ManyToOne(() => Item, (item) => item.enchantments)
    item: Item;

    @OneToMany(() => CraftingResource, (resource) => resource.enchantment, {
        cascade: true,
        eager: true,
    })
    resources: CraftingResource[];
}

@Entity()
export class CraftingResource {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    uniquename: string;

    @Column()
    count: number;

    @ManyToOne(() => Item, (item) => item.resources)
    item: Item;

    @ManyToOne(() => CraftingEnchantment, (enc) => enc.resources)
    enchantment: CraftingEnchantment;

    @ManyToMany(() => Item, (item) => item.uniquename, {})
    resource: Item;
}
