function parseUplink(device, payload) 
{
    function ExtractTagData(tagValuesObject) {
        v = null;
        q = null;
        ts = null;
        return {
            v: (tagValuesObject["v"].toFixed(2)),
            q: tagValuesObject["q"],
            ts: new Date(tagValuesObject["ts"]).toUTCString()
        };
}

    var PanasonicData = JSON.parse(payload.asString());
    env.log(PanasonicData);

   for (let tag in PanasonicData) {
  
    switch (tag){
        case "iCuenta":
            //Obtenemos el array con lecturas de este tag
            var tagvalues = PanasonicData[tag];
            //Recorremos las lecturas y leemos los valores v, q y ts
            tagvalues.forEach(valueElement => {
                var ValueData = ExtractTagData(valueElement);
                //Listo, actualizamos el endpoint
                var etv1 = device.endpoints.byAddress("2");
                etv1.updateGenericSensorStatus(ValueData.v, ValueData.ts);
            });
            break; 
        }
    }

}