package at.htl.nvs.chatter.business

import at.htl.nvs.chatter.entities.User
import javax.ejb.Stateless
import javax.persistence.EntityManager
import javax.persistence.PersistenceContext

@Stateless
open class UserFacade {

    @PersistenceContext
    private lateinit var entityManager: EntityManager


    open fun getAllUsers() : List<User> {
        return entityManager.createNamedQuery("User.getAllUsers", User::class.java).resultList;
    }

    open fun loginUser(user: User) {
        entityManager.merge(user)
    }
}