package at.htl.nvs.chatter.business

import at.htl.nvs.chatter.entities.Message
import javax.ejb.Stateless
import javax.persistence.EntityManager
import javax.persistence.PersistenceContext

@Stateless
open class MessageFacade {

    @PersistenceContext
    private lateinit var entityManager: EntityManager

    open fun saveMessage(message: Message) {
        entityManager.persist(message)
    }

    open fun getConversationOfUsers(user1: String, user2: String): List<Message> {
        return entityManager.createNamedQuery("Message.getConversationOfUsers", Message::class.java)
                .setParameter("u1", user1)
                .setParameter("u2", user2)
                .resultList
    }
}