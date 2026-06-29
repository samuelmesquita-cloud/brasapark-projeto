import {Request,Response} from "express";
import {prisma} from "../config/prisma.js";

export async function listar(req:Request,res:Response){
 res.json(await prisma.cliente.findMany({include:{atracao:true}}));
}

export async function buscar(req:Request,res:Response){
 res.json(await prisma.cliente.findUnique({
 where:{id:Number(req.params.id)}
 }));
}

export async function criar(req:Request,res:Response){
 res.status(201).json(await prisma.cliente.create({data:req.body}));
}

export async function atualizar(req:Request,res:Response){
 res.json(await prisma.cliente.update({
 where:{id:Number(req.params.id)},
 data:req.body
 }));
}

export async function remover(req:Request,res:Response){
 await prisma.cliente.delete({
 where:{id:Number(req.params.id)}
 });
 res.json({message:"Removido"});
}
