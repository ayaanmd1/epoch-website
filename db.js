module.exports=class MongoConnect{    

    mongoose=require("mongoose");
    Schema=this.mongoose.Schema;

    destructor(inputType){
        if(inputType==="Contact Us"){
            this.mongoose.connection.deleteModel("EpochTestDataset");
        }else{
            this.mongoose.connection.deleteModel("NewsLetterDataset");
        }
        this.mongoose.connection.close();

        delete this.mongoose.model;
        delete this.Schema;
        delete this.epochSchema;
        delete this.emailSchema;
        delete this.collection;
        
        console.log("Things have been deleted")
    }
    constructor(inputType,name,number,email,message,newslettermail){    
        this.inputType=inputType;
        this.epochSchema=new this.Schema({
            name:String,
            number:Number,
            email:String,
            message:String  
        })
        
        this.emailSchema=new this.Schema({
            newslettermail:String
        })

        if(inputType==="Contact Us"){
            this.name=name;
            this.number=number;
            this.email=email;
            this.message=message;
        }else{
            this.newslettermail=newslettermail;
        }
        this.connect(inputType);
    }
    
    connect(inputType){
        
        const url="mongodb+srv://FarazNasir46:My1@epoch.moks8.mongodb.net/EPOCH?retryWrites=true&w=majority"
        this.mongoose.connect(url,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })

        this.db=this.mongoose.connection;

        this.db.on("error",(err)=>{
            console.log(err);
        })
        this.db.once("open",()=>{
            console.log("Database Connected");
            

            //Fix this issue when time,this is not the correct way to deal with multiple form input error;
            try{
                this.schemaValidations(inputType)
            }
            catch{
                console.log("Trying to OverWrite")
                return;
            }

            if(inputType==="Contact Us"){

                this.DataConnectFunctions(this.name,this.number,this.email,this.message);
            }
            else{

                this.DataConnectFunctions("","","","",this.newslettermail)
            }
        })
    }

    schemaValidations(inputType){
        console.log("Reached Schema Validation Function")
        if(inputType===`Contact Us`){
            
                this.collection=this.mongoose.model("EpochTestDataset",this.epochSchema)
            
        }else{
            
                this.collection=this.mongoose.model("NewsLetterDataset",this.emailSchema)
            
        }
        console.log("Exiting Schema Validation Function")
    }



    async find(newslettermail){
        console.log("Searching for: "+newslettermail)
        let find=await this.collection.find({newslettermail})
    
        if(find.length!==0){
            
            console.log("Data was already present in the Database,No need to save it again.");   
        }else{
            console.log("Data was not present in the Database, and is now being stored");   
            
            this.collection.create({
            newslettermail:newslettermail
            }).then(()=>{
                console.log("Data Has Been Saved")
                this.destructor(this.inputType);
            }).catch((err)=>{
                console.log(err)
                console.log("Could'nt log Data");
            })   
        }
    }

    DataConnectFunctions(name,number,email,message,newslettermail){
        console.log("Form Data Has reached")

        if(!newslettermail){    
            this.collection.create({
                name:name,
                number:number,
                email:email,
                message:message
            }).then(()=>{
                console.log("Information has been recorded")
                this.destructor(this.inputType);
            })
        }else{
            this.find(newslettermail)
        }
    }
}

