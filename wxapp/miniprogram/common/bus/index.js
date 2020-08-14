


class Bus{
	
	
	constructor(arg) {
	    
		this.event_queue = []
		
	}
	
	$on(name,func)
	{
		
		let event = {
			"name":name,
			"func":func,
			"once":false
		}
		
		this.event_queue.push(event)
		
	}
	
	$emit(name,data)
	{
		
		for(let i=this.event_queue.length-1;i>=0;i--){
			
			if(this.event_queue[i].name == name){
				
				this.event_queue[i].func(data)
				
				if(this.event_queue[i].once){
					
					this.event_queue.splice(i,1)
					
				}
			}
		}

	}
	
	$once(name,func)
	{
		
		let event = {
			"name":name,
			"func":func,
			"once":true
		}
		
		this.event_queue.push(event)
		
	}
	
	$off(name,func)
	{
		
		for(let i=this.event_queue.length-1;i>=0;i--){
			
			if(this.event_queue[i].name == name){
				
				if(func){
					if(this.event_queue[i].func == func){
						
						this.event_queue.splice(i,1)
						
					}
				}else{
					
					this.event_queue.splice(i,1)
					
				}
			}
		}
		
	}
}

let bus = new Bus();

export {bus};