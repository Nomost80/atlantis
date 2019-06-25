using System.Threading.Tasks;
using Device.API.Model;
using Microsoft.AspNetCore.Mvc;
using MQTTnet;
using MQTTnet.Client;
using MQTTnet.Client.Options;
using MQTTnet.Client.Publishing;
using MQTTnet.Formatter;

namespace Device.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommandsController : ControllerBase
    {
        private IMqttClient _mqttClient;
        private IMqttClientOptions _options = new MqttClientOptionsBuilder()
            .WithWebSocketServer("localhost:8083/mqtt")
            .WithProtocolVersion(MqttProtocolVersion.V311)
            .Build();

        public CommandsController()
        {
            _mqttClient = new MqttFactory().CreateMqttClient();
        }

        [HttpPost]
        public async Task<bool> Post([FromBody] Command command)
        {
            await _mqttClient.ConnectAsync(_options);

            var json = Newtonsoft.Json.JsonConvert.SerializeObject(command);
            var message = new MqttApplicationMessageBuilder()
                .WithTopic($"{command.MacAddress}/command")
                .WithPayload(json)
                .WithExactlyOnceQoS()
                .WithRetainFlag()
                .Build();

            var result = await _mqttClient.PublishAsync(message);
            return result.ReasonCode == MqttClientPublishReasonCode.Success;
        }
    }
}