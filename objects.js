class printObject{
    constructor(){
        this.listener = this.listener;
    }
    listener(){
        return setInterval( ()=>{
            // if(Messages.length =! 0){
                Messages.map( (item,index)=>{
                    // print message to the console
                    console.log(`Application:`+item.type+` ::`+ item.message);
                    // remove message from context buffer
                    Clean(item.message);
                    // kill listener and restar
                    clearInterval(Print_);
                    Print_ = new printObject().listener();
                })
            // }
        },100) 
    }
}
class context{
    constructor(){
        this.messages = []; //message buffer
        this.objects = []; // Apps and programs
    }
    garbageCollector(message_to_remove){
        var messages_array = Messages;
        // find message to be deleted
        messages_array.map( (item, index)=>{
            if( item.message == message_to_remove){
                return Messages.splice(index,1)
            }
        })
    }
    closeApp(appName){
        var apps = ActiveApps;
        // map for app in system and remove
        apps.map( (app, index)=>{
            if(app.ApplicationName == appName){
                const killPrint = ()=>{
                    if(ActiveApps.length == 0){
                        clearInterval(Print);
                    }
                }
                return ActiveApps.splice(index,1), killPrint()
            }
        })
    }
}
class Text_Application{
    constructor(){
        this.type = this.typeText;
    }
    typeText(text){
        return Messages.push({
            type: this.constructor.name,
            message:text
        })
    }
    appName(){
        return {
            appName: this.constructor.name,
            systemName: "Text Editor",
            exe:()=>{return new Text_Application()}
        }
    }
}
class GUI_Manager{
    constructor(){
        this.type = this.status;
    }
    status(text){
        return Messages.push({
            type: this.constructor.name,
            message:text
        })
    }
    appName(){
        return {
            appName: this.constructor.name,
            systemName: "GUI",
            exe:()=>{return new GUI_Manager()}
        }
    }
}
class Apps{
    constructor(){
        // installed apps to  execute
        this.installedApplications = [];
        this.installApp = this.installApp;
    }
    Open(appName){
        // find app in Applications directory
        Applications.map((app,index)=>{
            if(app.nameOnSystem == appName){
                // Open Application and push to active app bucket
                const startPrint = ()=>{
                    if(ActiveApps.length == 0){
                        Print_ = new printObject().listener()
                    }
                }
                startPrint()
                return ActiveApps.push(app);
            }
        })
    }
    installApp(ApplicationName, nameOnSystem, execute_function){
        return Applications.push({
            ApplicationName: ApplicationName,
            nameOnSystem: nameOnSystem,
            exe: execute_function
        })
    }
}