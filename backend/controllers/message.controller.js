import express from "express";
import Message from "../models/message.model.js";

export const sendMessage = async (req,res) => {
    const {message,senderid} = req.body;
    const {receiverid} = req.params;

    if(!message || !senderid || !receiverid){
        res.status(400).json({message:"all fields are required"})
        console.log("Missing fields:", {message, senderid, receiverid});
        return;
    }

    try {
        const newmessage = new Message({
            message,
            senderid,
            receiverid
        })
        await newmessage.save();
        res.status(201).json({message:"message sent"
            , newmessage
        })
        return;
        
    } catch (error) {
        console.log("Error while sending message:", error);
        res.status(500).json({message:"internal server error"})     
    }
}
export const getMessages = async (req,res) => {
    const usercookie = req.cookies.userdata;
    if(usercookie){
        const user = typeof usercookie === 'string' ? JSON.parse(usercookie) : usercookie;
        const userid = user.id;
        const senderid = userid;
        const {receiverid} = req.params;
        if(!receiverid){
            res.status(400).json({message:"receiver id is required"})
            return;
        }
        const messages = await message.find({
        senderid:{ $in: [senderid, receiverid]},
        receiverid:{ $in: [receiverid, senderid]}
        })
        res.status(200).json({messages})
        return;
    }
    else{
        res.status(401).json({message:"unauthorized when fetching messages"})
        return;
    }
    
   
    
}