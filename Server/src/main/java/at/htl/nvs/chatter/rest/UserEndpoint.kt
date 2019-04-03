package at.htl.nvs.chatter.rest

import at.htl.nvs.chatter.business.UserFacade
import at.htl.nvs.chatter.entities.User
import javax.ejb.Stateless
import javax.inject.Inject
import javax.ws.rs.*
import javax.ws.rs.core.MediaType
import javax.ws.rs.core.Response

@Stateless
@Path("users")
open class UserEndpoint {

    @Inject
    private lateinit var userFacade: UserFacade

    @GET
    @Path("getAllUsers")
    @Produces(MediaType.APPLICATION_JSON)
    open fun getAllUsers(): Response {
        return Response.ok(userFacade.getAllUsers())
                .enableCors()
                .build()
    }

    @PUT
    @Path("login")
    @Consumes(MediaType.APPLICATION_JSON)
    open fun loginUser(user: User): Response {
        userFacade.loginUser(user)
        return Response.ok()
                .enableCors()
                .build()
    }

    @OPTIONS
    @Path("login")
    open fun loginUserOptions(): Response {
        return Response.ok()
                .enableCors()
                .build()
    }

    private fun Response.ResponseBuilder.enableCors() =
        this.header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT")
                .header("Access-Control-Allow-Headers", "content-type")
}