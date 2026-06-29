import {Request,Response} from "express";
import {prisma} from "../config/prisma.js";

export async function listar(req:Request,res:Response){
 res.json(await prisma.atracao.findMany({include:{clientes:true}}));
}

export async function buscar(req:Request,res:Response){
 const item=await prisma.atracao.findUnique({where:{id:Number(req.params.id)}});
 res.json(item);
}

export async function criar(req:Request,res:Response){
 const item=await prisma.atracao.create({data:req.body});
 res.status(201).json(item);
}

export async function atualizar(req:Request,res:Response){
 const item=await prisma.atracao.update({
 where:{id:Number(req.params.id)},
 data:req.body
 });
 res.json(item);
}

export async function remover(req:Request,res:Response){
 await prisma.atracao.delete({where:{id:Number(req.params.id)}});
 res.json({message:"Removido"});
}
