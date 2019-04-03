package at.htl.nvs.chatter.rest

import at.htl.nvs.chatter.business.MessageFacade
import at.htl.nvs.chatter.entities.Message
import javax.ejb.Stateless
import javax.inject.Inject
import javax.ws.rs.*
import javax.ws.rs.core.MediaType
import javax.ws.rs.core.Response

@Stateless
@Path("messages")
open class MessageEndpoint {

    @Inject
    private lateinit var messageFacade: MessageFacade

    @GET
    @Path("getConversationOfUsers/{u1}/{u2}")
    @Produces(MediaType.APPLICATION_JSON)
    open fun getConversationOfUsers(@PathParam("u1")user1: String, @PathParam("u2")user2: String): Response {
        return Response.ok(messageFacade.getConversationOfUsers(user1, user2))
                .enableCors()
                .build()
    }

    @POST
    @Path("addMessageToConversation")
    @Consumes(MediaType.APPLICATION_JSON)
    open fun addMessageToConversation(message: Message): Response {
        messageFacade.saveMessage(message)
        return Response.ok().enableCors().build()
    }

    private fun Response.ResponseBuilder.enableCors() =
            this.header("Access-Control-Allow-Origin", "*")
                    .header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT")
                    .header("Access-Control-Allow-Headers", "content-type")
}