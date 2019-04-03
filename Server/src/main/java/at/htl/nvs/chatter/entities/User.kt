package at.htl.nvs.chatter.entities

import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.NamedQueries
import javax.persistence.NamedQuery

@Entity(name = "USER_TABLE")
@NamedQueries(
        NamedQuery(name = "User.getAllUsers",
                query = "select u from USER_TABLE u")
)
data class User(
        @Id
        val userName: String
)